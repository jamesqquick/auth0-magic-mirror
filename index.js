const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/v1/meeting", (req, res) => {
  res.json({ status: "Hello World!" });
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
