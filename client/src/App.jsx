import { useEffect, useState } from "react";

const apiUrl = `${process.env.REACT_APP_API_URL || "http://localhost:5000"}/api/todos`;

export default function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getTodos() {
      try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        setTodos(data.todos ?? []);
      } catch {
        setError("Unable to load todos.");
      } finally {
        setLoading(false);
      }
    }

    getTodos();
  }, []);

  async function addTodo(event) {
    event.preventDefault();
    const cleanTitle = title.trim();
    if (!cleanTitle) {
      return;
    }

    setError("");
    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: cleanTitle, status: false }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Failed to add todo.");
        return;
      }

      setTodos((prev) => [...prev, data.todo]);
      setTitle("");
    } catch {
      setError("Unable to add todo.");
    }
  }

  async function toggleTodo(todo) {
    setError("");
    try {
      const res = await fetch(`${apiUrl}/${todo.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: !todo.status }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Failed to update todo.");
        return;
      }

      setTodos((prev) =>
        prev.map((item) => (item.id === todo.id ? data.todo : item))
      );
    } catch {
      setError("Unable to update todo.");
    }
  }

  async function removeTodo(id) {
    setError("");
    try {
      const res = await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Failed to delete todo.");
        return;
      }

      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch {
      setError("Unable to delete todo.");
    }
  }

  return (
    <main className="container">
      <h1>Awesome ToDo</h1>
      <form className="todo-form" onSubmit={addTodo}>
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Add a task"
        />
        <button type="submit">Add</button>
      </form>
      {error && <p className="error">{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id}>
              <label>
                <input
                  type="checkbox"
                  checked={todo.status}
                  onChange={() => toggleTodo(todo)}
                />
                <span className={todo.status ? "done" : ""}>{todo.title}</span>
              </label>
              <button onClick={() => removeTodo(todo.id)} type="button">
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
