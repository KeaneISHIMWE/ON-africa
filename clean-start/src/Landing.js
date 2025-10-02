import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

const Landing = () => {
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="landing-container">
      <div className="landing-content">
        <div className="landing-header">
          <h1 className="landing-title">ON AFRICA</h1>
          <p className="landing-subtitle">Your Gateway to Financial Freedom</p>
        </div>

        <div className="welcome-section">
          <h2 className="welcome-title">💰 Start Earning Today!</h2>
          <p className="welcome-description">
            Join thousands of successful entrepreneurs who are earning up to <strong>20,000 FRW daily</strong> 
            by watching videos and building their business network.
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Daily Earnings</h3>
            <p>Earn 20,000 FRW per video watched</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💎</div>
            <h3>Premium Benefits</h3>
            <p>Unlimited access with membership</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Instant Payouts</h3>
            <p>Fast cashouts via Mobile Money</p>
          </div>
        </div>

        <div className="urgency-section">
          <div className="countdown-container">
            <h3 className="countdown-title">⚠️ LIMITED TIME OFFER</h3>
            <div className="countdown-timer">
              <div className="countdown-number">{formatTime(timeLeft)}</div>
              <p className="countdown-warning">
                Registration closes soon! Don't miss your chance to start earning today.
                <br />
                <strong>After this timer expires, your profit opportunity will be terminated!</strong>
              </p>
            </div>
          </div>
        </div>

        <div className="cta-section">
          <button 
            className="cta-button primary"
            onClick={() => navigate('/register')}
          >
            🚀 Start Earning Now
          </button>
          <button 
            className="cta-button secondary"
            onClick={() => navigate('/login')}
          >
            Already a Member? Login
          </button>
        </div>

        <div className="testimonial-section">
          <h3>💬 What Our Members Say</h3>
          <div className="testimonials">
            <div className="testimonial">
              <p>"I earned 50,000 FRW in my first week!"</p>
              <span>- Sarah K.</span>
            </div>
            <div className="testimonial">
              <p>"Best investment I've ever made."</p>
              <span>- Jean P.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;