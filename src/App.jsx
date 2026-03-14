import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import Home from './Component/Pages/Home'
import Login from './Component/Pages/Login'
import Register from './Component/Pages/Register'
import Profile from './Component/Pages/Profile'
import Verify from './Component/Pages/Verify'
import ProtectedRoute from './Component/ProtectedRoute'
import { setAuthToken } from './api/authApi'

function App() {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setAuthToken(token);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify" element={<Verify />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
