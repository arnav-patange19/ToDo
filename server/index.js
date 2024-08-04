const express = require("express");

const app = express();

app.get("/hello", (req, res) => {
  res.status(200).json({ mssg: "hello peoples" });
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
