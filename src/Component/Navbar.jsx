import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Style/home.css';
import { setAuthToken } from '../api/authApi';

export default function Navbar() {
  const [logged, setLogged] = useState(!!localStorage.getItem('token'));
  const navigate = useNavigate();

  useEffect(() => {
    const onStorage = () => setLogged(!!localStorage.getItem('token'));
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuthToken(null);
    setLogged(false);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <h1 className="app-title">My To‑Do App</h1>
      <ul className="nav-links">
        <li><Link to="/" className="nav-link">Home</Link></li>
        {!logged ? (
          <>
            <li><Link to="/login" className="nav-link">Login</Link></li>
            <li><Link to="/register" className="nav-link">Register</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/profile" className="nav-link">Profile</Link></li>
            <li><button className="nav-link" onClick={handleLogout} style={{background:'none',border:'none',cursor:'pointer',padding:0}}>Logout</button></li>
          </>
        )}
      </ul>
    </nav>
  );
}
