import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Style/home.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Please enter email and password');
      return;
    }
    const user = { email: email.trim() };
    localStorage.setItem('user', JSON.stringify(user));
    navigate('/profile');
  };

  return (
    <div className="container">
      <nav className="navbar">
        <h1 className="app-title">My To‑Do App</h1>
        <ul className="nav-links">
          <li><Link to="/" className="nav-link">Home</Link></li>
          <li><Link to="/register" className="nav-link">Register</Link></li>
        </ul>
      </nav>

      <header className="page-header">
        <h2 className="page-title">Login</h2>
        <p className="page-subtitle">Sign in to manage your tasks</p>
      </header>

      <section className="todo-section">
        <form onSubmit={handleSubmit}>
          <div style={{display:'flex',flexDirection:'column',gap:10}}>
            <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
            <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
            <button className="button" type="submit">Login</button>
          </div>
        </form>
        {error && <p className="error-message">{error}</p>}
        <p style={{marginTop:12}}>Don't have an account? <Link to="/register">Register</Link></p>
      </section>
    </div>
  );
};

export default Login;
