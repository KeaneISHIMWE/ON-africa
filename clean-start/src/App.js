import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Register from './Register';
import Dashboard from './Dashboard';

function Login() {
  const navigate = useNavigate();
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">Login to ON AFRICA</h2>
        <p className="auth-desc">Watch videos and earn money</p>
        <form onSubmit={e => { e.preventDefault(); navigate('/dashboard'); }}>
          <input type="email" required placeholder="Email address" className="auth-input" />
          <input type="password" required placeholder="Password" className="auth-input" />
          <button type="submit" className="auth-btn">Sign in</button>
        </form>
        <a href="/register" className="auth-link">Don't have an account? Register</a>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
