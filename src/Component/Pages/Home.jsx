import React, { useState } from 'react';
import '../Style/home.css';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editingId, setEditingId] = useState(null);

  const handleAdd = () => {
    const trimmed = inputValue.trim();
    if (trimmed === '') return;
    setTasks(prev => [
      ...prev,
      { id: Date.now(), text: trimmed }
    ]);
    setInputValue('');
  };

  const handleDelete = id => {
    setTasks(prev => prev.filter(t => t.id !== id));
    if (editingId === id) setEditingId(null);
  };

  const handleEditStart = id => {
    setEditingId(id);
  };

  const handleEditSave = (id, newText) => {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, text: newText } : t))
    );
    setEditingId(null);
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
          />
          <button className="button" onClick={handleAdd}>Add</button>
        </div>

        <ul className="todo-list">
          {tasks.map(task => (
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
