const express = require("express");

const router = express.Router();
let allToDos = [
  {
    id: 1,
    title: "finish nodejs setup",
    status: true,
    tag: ["school", "personal"],
    date: "24th October 2024",
  },
  {
    id: 2,
    title: "finish nodejs setup",
    status: false,
    tag: ["school", "personal"],
    date: "24th October 2024",
  },
];
let nextTodoId = allToDos.reduce((maxId, todo) => Math.max(maxId, todo.id), 0) + 1;
// Get todos/
router.get("/todos", (req, res) => {
  res.status(200).json({ todos: allToDos });
});
// Post todos/
router.post("/todos", (req, res) => {
  const { title, status, tag, date } = req.body ?? {};
  if (!title || typeof title !== "string" || !title.trim()) {
    return res.status(400).json({ mssg: "title is required" });
  }

  const newToDo = {
    id: nextTodoId++,
    title: title.trim(),
    status: typeof status === "boolean" ? status : false,
    tag: Array.isArray(tag) ? tag : [],
    date: date || new Date().toLocaleDateString(),
  };

  allToDos.push(newToDo);
  res.status(201).json({ todo: newToDo });
});
// Delete todos/:id
router.delete("/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  const beforeLength = allToDos.length;
  allToDos = allToDos.filter((todo) => todo.id !== id);

  if (beforeLength === allToDos.length) {
    return res.status(404).json({ mssg: "todo not found" });
  }

  res.status(200).json({ mssg: "todo deleted" });
});

// Put todos/:id
router.put("/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  const todoIndex = allToDos.findIndex((todo) => todo.id === id);

  if (todoIndex === -1) {
    return res.status(404).json({ mssg: "todo not found" });
  }

  const currentTodo = allToDos[todoIndex];
  const updatedTodo = {
    ...currentTodo,
    ...req.body,
    id: currentTodo.id,
  };

  if (!updatedTodo.title || !String(updatedTodo.title).trim()) {
    return res.status(400).json({ mssg: "title is required" });
  }

  updatedTodo.title = String(updatedTodo.title).trim();
  updatedTodo.status = Boolean(updatedTodo.status);
  updatedTodo.tag = Array.isArray(updatedTodo.tag) ? updatedTodo.tag : [];
  updatedTodo.date = updatedTodo.date || currentTodo.date;

  allToDos[todoIndex] = updatedTodo;
  res.status(200).json({ todo: updatedTodo });
});

module.exports = router;
