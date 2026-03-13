import React, { useEffect, useState } from 'react';
import '../Style/home.css';
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from '../../api/todoApi';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const todos = await getTodos();
        // Some backends return { data: [...] } or { todos: [...] }.
        const normalized =
          Array.isArray(todos)
            ? todos
            : Array.isArray(todos?.data)
            ? todos.data
            : Array.isArray(todos?.todos)
            ? todos.todos
            : [];

        setTasks(normalized);
      } catch (err) {
        setError('Could not load tasks.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const handleAdd = async () => {
    const trimmed = inputValue.trim();
    if (trimmed === '') return;

    try {
      const created = await createTodo({ text: trimmed });
      const normalized =
        Array.isArray(created)
          ? created
          : created?.data
          ? created.data
          : created;

      setTasks(prev =>
        Array.isArray(normalized) ? normalized : [...prev, normalized]
      );
      setInputValue('');
    } catch (err) {
      setError('Could not create task.');
      console.error(err);
    }
  };

  const handleDelete = async id => {
    try {
      await deleteTodo(id);
      setTasks(prev => prev.filter(t => t.id !== id));
      if (editingId === id) setEditingId(null);
    } catch (err) {
      setError('Could not delete task.');
      console.error(err);
    }
  };

  const handleEditStart = id => {
    setEditingId(id);
  };

  const handleEditSave = async (id, newText) => {
    try {
      const updated = await updateTodo(id, { text: newText });
      const normalized = updated?.data ? updated.data : updated;
      setTasks(prev =>
        prev.map(t =>
          t.id === id
            ? { ...t, text: normalized?.text ?? newText }
            : t
        )
      );
      setEditingId(null);
    } catch (err) {
      setError('Could not update task.');
      console.error(err);
    }
  };

  return (
    <div className="container">
      {/* Navigation bar */}
      <nav className="navbar">
        <h1 className="app-title">My To‑Do App</h1>
        <ul className="nav-links">
          <li><a href="#" className="nav-link">Home</a></li>
          <li><a href="#" className="nav-link">About</a></li>
          <li><a href="#" className="nav-link">Contact</a></li>
        </ul>
      </nav>

      {/* Main heading */}
      <header className="page-header">
        <h2 className="page-title">Tasks</h2>
        <p className="page-subtitle">Keep track of what you need to do</p>
      </header>

      {/* Todo section */}
      <section className="todo-section">
        <div className="todo-input">
          <input
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            placeholder="Add new task..."
            onKeyDown={e => e.key === 'Enter' && handleAdd()}
            disabled={loading}
          />
          <button className="button" onClick={handleAdd} disabled={loading}>
            Add
          </button>
        </div>

        {error && <p className="error-message">{error}</p>}
        {loading && <p className="loading-message">Loading tasks…</p>}

        <ul className="todo-list">
          {(Array.isArray(tasks) ? tasks : []).map(task => (
            <li key={task.id} className="todo-item">
              {editingId === task.id ? (
                <EditForm
                  initialText={task.text}
                  onSave={newText => handleEditSave(task.id, newText)}
                  onCancel={() => setEditingId(null)}
                />
              ) : (
                <>
                  <span className="todo-text">{task.text}</span>
                  <div className="todo-actions">
                    <button
                      className="button small"
                      onClick={() => handleEditStart(task.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="button small danger"
                      onClick={() => handleDelete(task.id)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

function EditForm({ initialText, onSave, onCancel }) {
  const [value, setValue] = useState(initialText);
  return (
    <div className="edit-form">
      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter') onSave(value.trim());
          if (e.key === 'Escape') onCancel();
        }}
      />
      <button className="button small" onClick={() => onSave(value.trim())}>
        Save
      </button>
      <button className="button small" onClick={onCancel}>
        Cancel
      </button>
    </div>
  );
}

export default Home;
