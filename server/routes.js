const express = require("express");

const router = express.Router();

// Get todos/
router.get("/todos", (req, res) => {
  res.status(200).json({ mssg: "get request to /api/todos" });
});
// Post todos/
router.post("/todos", (req, res) => {
  res.status(201).json({ mssg: "post get request to /api/todos" });
});
// Delete todos/:id
router.delete("/todos/:id", (req, res) => {
  res.status(200).json({ mssg: "delete request to /api/todos/:id" });
});

// Put todos/:id
router.put("/todos/:id", (req, res) => {
  res.status(200).json({ mssg: "put request to /api/todos:id" });
});

module.exports = router;
