const express = require("express");
const app = express();
const { Client } = require("pg");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

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

app.post("/v1/update-meeting", (req, res) => {
  try {
    const client = new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    });
    client.connect();
    client.query(
      `UPDATE mirror set status = '${req.body.status}', updated_at = now();`,
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
