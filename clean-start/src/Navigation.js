import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = localStorage.getItem('token');

  if (location.pathname === '/') {
    return null; // Don't show navigation on landing page
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userData');
    navigate('/');
  };

  return (
    <div className="nav-sidebar">
      <div className="nav-header">
        <h3 className="nav-title">🎯 ON AFRICA</h3>
        <p className="nav-subtitle">Business Platform</p>
      </div>
      
      <nav className="nav-menu">
        <button 
          className={`nav-btn ${location.pathname === '/login' ? 'active' : ''}`}
          onClick={() => navigate('/login')}
        >
          <span className="nav-icon">🔐</span>
          <span>Login</span>
        </button>
        
        <button 
          className={`nav-btn ${location.pathname === '/register' ? 'active' : ''}`}
          onClick={() => navigate('/register')}
        >
          <span className="nav-icon">📝</span>
          <span>Register</span>
        </button>
        
        {isAuthenticated && (
          <button 
            className={`nav-btn ${location.pathname === '/dashboard' ? 'active' : ''}`}
            onClick={() => navigate('/dashboard')}
          >
            <span className="nav-icon">📊</span>
            <span>Dashboard</span>
          </button>
        )}
      </nav>
      
      <div className="nav-footer">
        <button className="nav-home-btn" onClick={() => navigate('/')}>
          🏠 Home
        </button>
        {isAuthenticated && (
          <button className="nav-logout-btn" onClick={handleLogout}>
            🚪 Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navigation;