import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Style/home.css';
import Navbar from '../Navbar';
import { getProfile, setAuthToken } from '../../api/authApi';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setAuthToken(token);
    else return;

    (async () => {
      setLoading(true);
      try {
        const data = await getProfile();
        if (data.user) {
          setUser(data.user);
          localStorage.setItem('user', JSON.stringify(data.user));
        } else if (data.name || data.email) {
          // some APIs return the user object directly
          setUser(data);
          localStorage.setItem('user', JSON.stringify(data));
        }
      } catch (err) {
        setError('Could not load profile');
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setAuthToken(null);
    navigate('/login');
  };

  if (!user && !loading) {
    return (
      <div className="container">
        <Navbar />
        <section className="todo-section">
          <p>Please <Link to="/login">login</Link> to view your profile.</p>
        </section>
      </div>
    );
  }

  return (
    <div className="container">
      <Navbar />

      <header className="page-header">
        <h2 className="page-title">Profile</h2>
        <p className="page-subtitle">Your account info</p>
      </header>

      <section className="todo-section">
        {loading ? (
          <p className="loading-message">Loading…</p>
        ) : (
          <>
            <p><strong>Name:</strong> {user?.name || '—'}</p>
            <p><strong>Email:</strong> {user?.email || '—'}</p>
            <div style={{marginTop:12}}>
              <button className="button" onClick={handleLogout}>Logout</button>
            </div>
          </>
        )}
        {error && <p className="error-message">{error}</p>}
      </section>
    </div>
  );
};

export default Profile;
