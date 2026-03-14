import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import '../Style/home.css';
import Navbar from '../Navbar';
import { verify as apiVerify, setAuthToken } from '../../api/authApi';

export default function Verify() {
  const location = useLocation();
  const navigate = useNavigate();
  const initialEmail = location?.state?.email || '';
  const [email] = useState(initialEmail);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);
    if (!email && !otp) {
      setError('Missing email or OTP');
      return;
    }
    setLoading(true);
    try {
      const data = await apiVerify({ email, otp });
      if (data.token) {
        localStorage.setItem('token', data.token);
        setAuthToken(data.token);
      }
      if (data.user) localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/login');
    } catch (err) {
      setError(err?.response?.data?.message || 'Verification failed');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <Navbar />

      <header className="page-header">
        <h2 className="page-title">Verify Account</h2>
        <p className="page-subtitle">Enter the OTP sent to your email</p>
      </header>

      <section className="todo-section">
        <form onSubmit={handleSubmit}>
          <div style={{display:'flex',flexDirection:'column',gap:10}}>
            {email ? (
              <p>Verifying <strong>{email}</strong></p>
            ) : (
              <input placeholder="Email" value={email} readOnly />
            )}
            <input placeholder="OTP" value={otp} onChange={e => setOtp(e.target.value)} />
            <button className="button" type="submit" disabled={loading}>{loading ? 'Verifying…' : 'Verify'}</button>
          </div>
        </form>
        {error && <p className="error-message">{error}</p>}
      </section>
    </div>
  );
}
