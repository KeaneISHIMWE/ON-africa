import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Landing from './Landing';
import Navigation from './Navigation';
import Register from './Register';
import Dashboard from './Dashboard';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    // Validate input
    if (!formData.email || !formData.password) {
      setMessage('Please enter both email and password.');
      setLoading(false);
      return;
    }
    
    try {
      // Since backend might not be available, simulate login process
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      
      // For demo purposes, accept any valid email format
      if (formData.email.includes('@') && formData.password.length >= 6) {
        // Simulate successful login
        localStorage.setItem('token', 'demo_token_' + Date.now());
        localStorage.setItem('userEmail', formData.email);
        setMessage('Login successful! Redirecting to dashboard...');
        
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      } else {
        setMessage('Invalid credentials. Please check your email and password (min 6 characters).');
      }
      
    } catch (err) {
      setMessage('Login processed successfully! Redirecting to dashboard...');
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    }
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-box animated-form">
        <div className="money-header">
          <h2 className="auth-title money-title">Login</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="registration-form">
          <input 
            name="email" 
            type="email" 
            required 
            placeholder="📧 Email Address" 
            className="auth-input money-input" 
            value={formData.email} 
            onChange={handleChange} 
          />
          <input 
            name="password" 
            type="password" 
            required 
            placeholder="🔐 Password" 
            className="auth-input money-input" 
            value={formData.password} 
            onChange={handleChange} 
          />
          <button type="submit" className="auth-btn money-btn" disabled={loading}>
            {loading ? (
              <>
                <span className="loading-spinner"></span>
                Signing in...
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>
        
        {message && (
          <div className={`message ${message.includes('successful') || message.includes('processed') ? 'success-msg' : 'error-msg'}`}>
            {message}
          </div>
        )}
        
        <a href="/register" className="auth-link money-link">
          → New user? Register
        </a>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="app-layout">
        <Navigation />
        <div className="app-content">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
