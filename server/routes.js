const express = require("express");

const router = express.Router();
let allToDos = {
  todos: [
    {
      title: "finish nodejs setup",
      status: true,
      tag: ["school", "personal"],
      date: "24th October 2024",
    },
    {
      title: "finish nodejs setup",
      status: true,
      tag: ["school", "personal"],
      date: "24th October 2024",
    },
  ],
};
// Get todos/
router.get("/todos", (req, res) => {
  res.status(200).json(allToDos);
});
// Post todos/
router.post("/todos", (req, res) => {
  const x = allToDos["todos"];
  const newToDo = {
    title: "finish nodejs setup",
    status: true,
    tag: ["school", "personal"],
    date: "24th October 2024",
  };
  x.push(newToDo);
  res.status(201).json(x);
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
