const express = require("express");
require("dotenv").config();

const app = express();
const allowedOrigin = process.env.ALLOWED_ORIGIN || "http://localhost:3000";
app.use(express.json());
app.use((req, res, next) => {
  const requestOrigin = req.headers.origin;
  if (requestOrigin && requestOrigin !== allowedOrigin) {
    return res.status(403).json({ message: "origin not allowed" });
  }
  if (requestOrigin) {
    res.header("Access-Control-Allow-Origin", requestOrigin);
  }
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

// app.get("/square/:val", (req, res) => {
//   const val = req.params.val;
//   const x = parseInt(val);
//   const y = x * x;
//   res.status(200).json({ mssg: y });
// });

const router = require("./routes");
app.use("/api", router);
const port = 5000;
app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
