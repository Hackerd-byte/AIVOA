import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTasks = async () => {
    const res = await fetch("http://127.0.0.1:8000/tasks");
    setTasks(await res.json());
  };

  const addTask = async () => {
    await fetch("http://127.0.0.1:8000/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: Date.now(), title, completed: false })
    });
    setTitle("");
    fetchTasks();
  };

  useEffect(() => { fetchTasks(); }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Task Manager</h2>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New Task"
      />
      <button onClick={addTask}>Add</button>
      <ul>
        {tasks.map(t => (
          <li key={t.id}>{t.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
