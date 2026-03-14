import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Style/home.css';

const Profile = () => {
  const navigate = useNavigate();
  const raw = localStorage.getItem('user');
  const user = raw ? JSON.parse(raw) : null;

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) {
    return (
      <div className="container">
        <nav className="navbar">
          <h1 className="app-title">My To‑Do App</h1>
          <ul className="nav-links">
            <li><Link to="/" className="nav-link">Home</Link></li>
            <li><Link to="/login" className="nav-link">Login</Link></li>
          </ul>
        </nav>
        <section className="todo-section">
          <p>Please <Link to="/login">login</Link> to view your profile.</p>
        </section>
      </div>
    );
  }

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
        <h2 className="page-title">Profile</h2>
        <p className="page-subtitle">Your account info</p>
      </header>

      <section className="todo-section">
        <p><strong>Name:</strong> {user.name || '—'}</p>
        <p><strong>Email:</strong> {user.email || '—'}</p>
        <div style={{marginTop:12}}>
          <button className="button" onClick={handleLogout}>Logout</button>
        </div>
      </section>
    </div>
  );
};

export default Profile;
