const express = require("express");
const app = express();
const { Client } = require("pg");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const authConfig = require("./config.json");

const PORT = process.env.PORT || 3000;

const authorizeAccessToken = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
  }),
  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
  algorithms: ["RS256"]
});

app.use(bodyParser.json());
app.use(cors());
app.use(express.static("public"));

app.get("/v1/meeting", (req, res) => {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });
  client.connect();
  client.query("SELECT status, updated_at from mirror;", (err, data) => {
    if (err) {
      res.status(500);
    } else {
      res.json(data.rows[0]);
    }
    client.end();
  });
});

app.post("/v1/update-meeting", authorizeAccessToken, (req, res) => {
  try {
    const client = new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    });
    client.connect();
    client.query(
      `UPDATE mirror set status = $1, updated_at = now();`,
      [req.body.status],
      (err, data) => {
        if (err) {
          res.status(500).send(JSON.stringify(err));
        } else {
          res.send("Successfully updated");
        }
        client.end();
      }
    );
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
