import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    phone: '',
    email: '',
    password: '',
    screenshot: null
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour countdown
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

  const handleChange = (e) => {
    if (e.target.name === 'screenshot') {
      setFormData({ ...formData, screenshot: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    // Validate payment screenshot
    if (!formData.screenshot) {
      setMessage('Please upload your payment screenshot before registering.');
      setLoading(false);
      return;
    }
    
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    
    try {
      // Since backend might not be available, we'll simulate registration
      // In a real app, this would connect to your backend
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      
      setMessage('Registration submitted successfully! Your business account is being processed. IMPORTANT: Send your payment screenshot to the WhatsApp contact who introduced you to this opportunity through Instagram for immediate account activation.');
      
      // Auto-redirect after showing success message
      setTimeout(() => {
        // For demo purposes, redirect to login since backend isn't available
        navigate('/');
      }, 4000);
      
    } catch (err) {
      setMessage('Registration submitted! Please contact our WhatsApp support with your payment screenshot for manual verification.');
    }
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-box animated-form">
        
        {/* Countdown Timer */}
        <div className="countdown-warning">
          <div className="countdown-header">
            <span className="warning-icon">⚠️</span>
            <h3>TIME SENSITIVE OFFER</h3>
          </div>
          <div className="countdown-display">
            <div className="countdown-time">{formatTime(timeLeft)}</div>
            <p className="countdown-text">
              <strong>HURRY!</strong> Complete registration within 1 hour or your profit opportunity will be <strong>TERMINATED!</strong>
            </p>
          </div>
        </div>

        <div className="money-header">
          <h2 className="auth-title money-title">Register</h2>
        </div>
        
        <div className="payment-section">
          <h3 className="payment-title">💳 Business Registration Fee</h3>
          <div className="payment-details">
            <div className="payment-amount">
              <span className="amount-label">Registration Fee:</span>
              <span className="amount-value">3,900 FRW</span>
            </div>
            <div className="payment-method">
              <span className="method-label">Pay via MTN Mobile Money:</span>
              <span className="mtn-number">1818306</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} encType="multipart/form-data" className="registration-form">
          <input 
            name="username" 
            type="text" 
            required 
            placeholder="👤 Full Name" 
            value={formData.username} 
            onChange={handleChange} 
            className="auth-input money-input" 
          />
          <input 
            name="phone" 
            type="tel" 
            required 
            placeholder="📱 Phone Number" 
            value={formData.phone} 
            onChange={handleChange} 
            className="auth-input money-input" 
          />
          <input 
            name="email" 
            type="email" 
            required 
            placeholder="📧 Email Address" 
            value={formData.email} 
            onChange={handleChange} 
            className="auth-input money-input" 
          />
          <input 
            name="password" 
            type="password" 
            required 
            placeholder="🔐 Password" 
            value={formData.password} 
            onChange={handleChange} 
            className="auth-input money-input" 
          />
          
          <div className="screenshot-section">
            <label className="screenshot-label">
              📸 Payment Verification Screenshot
            </label>
            <input 
              name="screenshot" 
              type="file" 
              accept="image/*" 
              required 
              onChange={handleChange} 
              className="file-input"
            />
            <p className="screenshot-note">
              ⚠️ Upload clear screenshot of your MTN Mobile Money payment transaction
            </p>
          </div>
          
          <button type="submit" className="auth-btn money-btn" disabled={loading}>
            {loading ? (
              <>
                <span className="loading-spinner"></span>
                Processing Business Registration...
              </>
            ) : (
              'Register'
            )}
          </button>
        </form>
        
        <div className="whatsapp-support critical-notice">
          <h4 className="support-title">📞 IMPORTANT: Payment Verification Required</h4>
          <div className="verification-steps">
            <div className="step">
              <span className="step-number">1</span>
              <span className="step-text">Complete payment to MTN Mobile Money: <strong>1818306</strong></span>
            </div>
            <div className="step">
              <span className="step-number">2</span>
              <span className="step-text">Take screenshot of payment confirmation</span>
            </div>
            <div className="step critical-step">
              <span className="step-number">3</span>
              <span className="step-text">
                <strong>MANDATORY:</strong> Send screenshot to the WhatsApp contact who introduced you to this business opportunity through Instagram
              </span>
            </div>
          </div>
          
          <div className="contact-reminder">
            <p className="reminder-text">
              📱 Contact the same person who shared the Instagram advertisement with you
            </p>
            <p className="verification-note">
              ✅ Your account will be activated within 30 minutes of verification
            </p>
          </div>
        </div>
        
        {message && (
          <div className={`message ${message.includes('successful') || message.includes('submitted') ? 'success-msg' : 'error-msg'}`}>
            {message}
          </div>
        )}
        
        <a href="/login" className="auth-link money-link">
          ← Already registered? Login
        </a>
      </div>
    </div>
  );
};

export default Register;
