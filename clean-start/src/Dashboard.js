import React from 'react';
import './App.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-box">
        <h2 className="auth-title">Welcome to your Dashboard</h2>
        <div className="bonus-banner">
          Congratulations! You have received a <span style={{ color: '#059669' }}>7500 FRW</span> bonus for creating an account on ON AFRICA.
        </div>
        <div className="videos-section">
          <div className="videos-title">Available Videos</div>
          <p style={{ color: '#666', marginBottom: 8 }}>Watch videos to earn more money. Each completed video adds to your earnings.</p>
          <div className="videos-list">
            <div className="video-card">Video 1 (Demo)</div>
            <div className="video-card">Video 2 (Demo)</div>
          </div>
        </div>
        <a href="/" className="auth-link">Logout</a>
      </div>
    </div>
  );
};

export default Dashboard;
