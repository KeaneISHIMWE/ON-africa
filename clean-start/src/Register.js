import React, { useState } from 'react';
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
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === 'screenshot') {
      setFormData({ ...formData, screenshot: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('Registration successful! You have received a 7500 FRW bonus.');
    setTimeout(() => navigate('/dashboard'), 1500);
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">Register for ON AFRICA</h2>
        <p className="auth-desc">Registration fee: 3900 FRW</p>
        <p className="auth-desc">Pay to MTN Mobile Money: <b>1818306</b></p>
        <form onSubmit={handleSubmit}>
          <input name="username" type="text" required placeholder="User Name" value={formData.username} onChange={handleChange} className="auth-input" />
          <input name="phone" type="tel" required placeholder="Number to be paid from" value={formData.phone} onChange={handleChange} className="auth-input" />
          <input name="email" type="email" required placeholder="Email" value={formData.email} onChange={handleChange} className="auth-input" />
          <input name="password" type="password" required placeholder="Password" value={formData.password} onChange={handleChange} className="auth-input" />
          <label style={{ fontSize: 14, color: '#333', marginBottom: 4, display: 'block' }}>Upload payment screenshot:</label>
          <input name="screenshot" type="file" accept="image/*" required onChange={handleChange} style={{ marginBottom: 16 }} />
          <button type="submit" className="auth-btn">Register</button>
        </form>
        {message && <div className="success-msg">{message}</div>}
        <a href="/" className="auth-link">Already have an account? Login</a>
      </div>
    </div>
  );
};

export default Register;
