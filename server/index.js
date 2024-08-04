const express = require("express");

const app = express();

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
