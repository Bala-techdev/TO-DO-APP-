import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Style/home.css';
import Navbar from '../Navbar';
import { register as apiRegister } from '../../api/authApi';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError('Please fill all fields');
      return;
    }
    setLoading(true);
    try {
      // call backend register endpoint
      await apiRegister({ name: name.trim(), email: email.trim(), password });

      // navigate to OTP verification page and pass the email via state
      navigate('/verify', { state: { email: email.trim() } });
    } catch (err) {
      setError(err?.response?.data?.message || 'Registration failed');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <Navbar />

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
            <button className="button" type="submit" disabled={loading}>{loading ? 'Registering…' : 'Register'}</button>
          </div>
        </form>
        {error && <p className="error-message">{error}</p>}
        <p style={{marginTop:12}}>Already have an account? <Link to="/login">Login</Link></p>
      </section>
    </div>
  );
};

export default Register;
