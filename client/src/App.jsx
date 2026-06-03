import { useEffect, useState } from "react";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const apiUrl = "http://localhost:5000/api/todos";

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
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: cleanTitle, status: false }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.mssg || "Failed to add todo.");
      return;
    }

    setTodos((prev) => [...prev, data.todo]);
    setTitle("");
  }

  async function toggleTodo(todo) {
    setError("");
    const res = await fetch(`${apiUrl}/${todo.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: !todo.status }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.mssg || "Failed to update todo.");
      return;
    }

    setTodos((prev) => prev.map((item) => (item.id === todo.id ? data.todo : item)));
  }

  async function removeTodo(id) {
    setError("");
    const res = await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (!res.ok) {
      setError(data.mssg || "Failed to delete todo.");
      return;
    }

    setTodos((prev) => prev.filter((todo) => todo.id !== id));
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
