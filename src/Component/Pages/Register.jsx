import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Style/home.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError('Please fill all fields');
      return;
    }
    const user = { name: name.trim(), email: email.trim() };
    localStorage.setItem('user', JSON.stringify(user));
    navigate('/profile');
  };

  return (
    <div className="container">
      <nav className="navbar">
        <h1 className="app-title">My To‑Do App</h1>
        <ul className="nav-links">
          <li><Link to="/" className="nav-link">Home</Link></li>
          <li><Link to="/login" className="nav-link">Login</Link></li>
        </ul>
      </nav>

      <header className="page-header">
        <h2 className="page-title">Register</h2>
        <p className="page-subtitle">Create an account to save your tasks</p>
      </header>

      <section className="todo-section">
        <form onSubmit={handleSubmit}>
          <div style={{display:'flex',flexDirection:'column',gap:10}}>
            <input placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} />
            <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
            <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
            <button className="button" type="submit">Register</button>
          </div>
        </form>
        {error && <p className="error-message">{error}</p>}
        <p style={{marginTop:12}}>Already have an account? <Link to="/login">Login</Link></p>
      </section>
    </div>
  );
};

export default Register;
