import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

const Dashboard = () => {
  const [user, setUser] = useState({
    username: 'Business Partner',
    email: '',
    balance: 7500,
    bonus: 7500,
    hasMembership: false,
    videosWatched: 0,
    dailyEarnings: 0
  });
  const [loading, setLoading] = useState(false);
  const [showMembershipModal, setShowMembershipModal] = useState(false);
  const [showCashoutModal, setShowCashoutModal] = useState(false);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userEmail = localStorage.getItem('userEmail');
    
    if (!token) {
      navigate('/');
      return;
    }
    
    // Initialize user data from localStorage or set defaults
    const savedUser = localStorage.getItem('userData');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      const userData = {
        username: userEmail ? userEmail.split('@')[0] : 'Business Partner',
        email: userEmail || '',
        balance: 7500,
        bonus: 7500,
        hasMembership: false,
        videosWatched: 0,
        dailyEarnings: 0
      };
      setUser(userData);
      localStorage.setItem('userData', JSON.stringify(userData));
    }
  }, [navigate]);
  
  const handleCashout = () => {
    if (!user.hasMembership) {
      setMessage('⚠️ Membership Required: You must purchase a premium membership card (18,800 FRW) before you can make any cashouts. Please upgrade to premium first.');
      setShowMembershipModal(true);
      return;
    } else {
      setShowCashoutModal(true);
    }
  };
  
  const purchaseMembership = async () => {
    setLoading(true);
    setMessage('');
    
    // Simulate membership purchase process
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const updatedUser = {
        ...user,
        hasMembership: true
      };
      
      setUser(updatedUser);
      localStorage.setItem('userData', JSON.stringify(updatedUser));
      setShowMembershipModal(false);
      setMessage('Membership card activated successfully! You can now cashout and earn 20,000 FRW daily by watching videos.');
      
    } catch (err) {
      setMessage('Membership activation in progress. Please contact support with your payment confirmation.');
    }
    setLoading(false);
  };
  
  const watchVideo = async () => {
    if (!user.hasMembership) {
      setMessage('Please purchase a membership card first to start earning from videos.');
      return;
    }
    
    setLoading(true);
    
    // Simulate video watching
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const newEarnings = 20000;
      const updatedUser = {
        ...user,
        balance: user.balance + newEarnings,
        videosWatched: user.videosWatched + 1,
        dailyEarnings: user.dailyEarnings + newEarnings
      };
      
      setUser(updatedUser);
      localStorage.setItem('userData', JSON.stringify(updatedUser));
      setMessage(`Congratulations! You earned 20,000 FRW by watching a video. Your new balance is ${updatedUser.balance} FRW.`);
      
    } catch (err) {
      setMessage('Video completed! Earnings added to your account.');
    }
    setLoading(false);
  };
  
  const processCashout = async () => {
    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setMessage(`Cashout request for ${user.balance} FRW has been submitted. You will receive your payment within 24 hours via MTN Mobile Money.`);
      setShowCashoutModal(false);
      
    } catch (err) {
      setMessage('Cashout request submitted successfully!');
    }
    setLoading(false);
  };
  
  // Logout functionality available in profile section
  // const handleLogout = () => {
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('userEmail');
  //   localStorage.removeItem('userData');
  //   navigate('/');
  // };

  if (loading) return (
    <div className="dashboard-container">
      <div className="dashboard-box">
        <div className="loading-spinner"></div>
        <p>Processing...</p>
      </div>
    </div>
  );
  
  // Error handling removed as not currently used

  return (
    <div className="dashboard-main-layout">
      {/* Dashboard Navigation */}
      <div className="dashboard-sidebar">
        <div className="dashboard-nav-header">
          <h3 className="dashboard-nav-title">💼 Dashboard</h3>
        </div>
        
        <nav className="dashboard-nav">
          <button 
            className={`dashboard-nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <span className="nav-icon">🏠</span>
            <span>Overview</span>
          </button>
          
          <button 
            className={`dashboard-nav-item ${activeTab === 'earnings' ? 'active' : ''}`}
            onClick={() => setActiveTab('earnings')}
          >
            <span className="nav-icon">📈</span>
            <span>Earnings</span>
          </button>
          
          <button 
            className={`dashboard-nav-item ${activeTab === 'videos' ? 'active' : ''}`}
            onClick={() => setActiveTab('videos')}
          >
            <span className="nav-icon">📹</span>
            <span>Videos</span>
          </button>
          
          <button 
            className={`dashboard-nav-item ${activeTab === 'cashout' ? 'active' : ''} ${!user.hasMembership ? 'disabled' : ''}`}
            onClick={() => {
              if (user.hasMembership) {
                setActiveTab('cashout');
              } else {
                handleCashout();
              }
            }}
          >
            <span className="nav-icon">💳</span>
            <span>Cashout</span>
            {!user.hasMembership && <span className="nav-lock">🔒</span>}
          </button>
          
          <button 
            className={`dashboard-nav-item ${activeTab === 'membership' ? 'active' : ''}`}
            onClick={() => setActiveTab('membership')}
          >
            <span className="nav-icon">💎</span>
            <span>Membership</span>
          </button>
          
          <button 
            className={`dashboard-nav-item ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <span className="nav-icon">👤</span>
            <span>Profile</span>
          </button>
        </nav>
        
        <div className="dashboard-nav-footer">
          <div className="membership-status-mini">
            <span className="status-icon">{user.hasMembership ? '✅' : '⚠️'}</span>
            <span className="status-text">
              {user.hasMembership ? 'Premium' : 'Basic'}
            </span>
          </div>
        </div>
      </div>
      
      {/* Main Content Area */}
      <div className="dashboard-main-content">
        {activeTab === 'dashboard' && (
          <div className="dashboard-box dashboard-enhanced">
            {/* Header Section */}
            <div className="dashboard-header">
              <h2 className="dashboard-title">💼 Business Dashboard</h2>
              <p className="welcome-text">Welcome back, <strong>{user.username}</strong>!</p>
            </div>
            
            {/* Balance Section */}
            <div className="balance-section">
              <div className="balance-card">
                <div className="balance-header">
                  <span className="balance-icon">💰</span>
                  <h3>Account Balance</h3>
                </div>
                <div className="balance-amount">{user.balance.toLocaleString()} FRW</div>
                <div className="balance-note">Available for withdrawal</div>
              </div>
            </div>
            
            {/* Bonus Banner */}
            <div className="bonus-banner enhanced">
              <div className="bonus-content">
                <span className="bonus-icon">🎁</span>
                <div>
                  <strong>Congratulations!</strong> You received a <strong>{user.bonus.toLocaleString()} FRW</strong> welcome bonus for joining ON AFRICA business platform.
                </div>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="stats-section">
              <div className="stat-card">
                <div className="stat-number">{user.videosWatched}</div>
                <div className="stat-label">Videos Watched</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{user.dailyEarnings.toLocaleString()}</div>
                <div className="stat-label">Daily Earnings (FRW)</div>
              </div>
            </div>
            
            {/* Message Display */}
            {message && (
              <div className="message success-msg">
                {message}
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'earnings' && (
          <div className="dashboard-box dashboard-enhanced">
            <h2 className="dashboard-title">📈 Earnings Overview</h2>
            <div className="earnings-summary">
              <div className="earning-card">
                <h3>Total Balance</h3>
                <div className="earning-amount">{user.balance.toLocaleString()} FRW</div>
              </div>
              <div className="earning-card">
                <h3>Daily Earnings</h3>
                <div className="earning-amount">{user.dailyEarnings.toLocaleString()} FRW</div>
              </div>
              <div className="earning-card">
                <h3>Welcome Bonus</h3>
                <div className="earning-amount">{user.bonus.toLocaleString()} FRW</div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'videos' && (
          <div className="dashboard-box dashboard-enhanced">
            <h2 className="dashboard-title">📹 Watch Videos & Earn</h2>
            <div className="video-earning-info">
              <div className="earning-rate">
                <span className="rate-icon">💰</span>
                <span>Earn <strong>20,000 FRW</strong> per video</span>
              </div>
              {!user.hasMembership && (
                <div className="membership-required">
                  <p>⚠️ Premium membership required to access video earning</p>
                  <button className="upgrade-btn" onClick={() => setShowMembershipModal(true)}>
                    Upgrade to Premium (18,800 FRW)
                  </button>
                </div>
              )}
            </div>
            <button 
              className="action-btn earn-btn full-width" 
              onClick={watchVideo}
              disabled={loading || !user.hasMembership}
            >
              <span className="btn-icon">📹</span>
              <span>{user.hasMembership ? 'Watch Video & Earn 20,000 FRW' : 'Premium Required'}</span>
            </button>
          </div>
        )}
        
        {activeTab === 'cashout' && user.hasMembership && (
          <div className="dashboard-box dashboard-enhanced">
            <h2 className="dashboard-title">💳 Cashout Center</h2>
            <div className="cashout-center">
              <div className="available-balance">
                <h3>Available for Withdrawal</h3>
                <div className="cashout-amount">{user.balance.toLocaleString()} FRW</div>
              </div>
              <button 
                className="action-btn cashout-btn full-width" 
                onClick={() => setShowCashoutModal(true)}
                disabled={loading || user.balance === 0}
              >
                <span className="btn-icon">💳</span>
                <span>Process Cashout</span>
              </button>
            </div>
          </div>
        )}
        
        {activeTab === 'membership' && (
          <div className="dashboard-box dashboard-enhanced">
            <h2 className="dashboard-title">💎 Membership Center</h2>
            <div className="membership-center">
              {user.hasMembership ? (
                <div className="membership-active">
                  <div className="membership-badge-large">
                    <span className="badge-icon">✅</span>
                    <h3>Premium Member</h3>
                  </div>
                  <div className="membership-benefits">
                    <h4>Your Premium Benefits:</h4>
                    <ul>
                      <li>✅ Instant cashout access</li>
                      <li>✅ Earn 20,000 FRW per video</li>
                      <li>✅ Unlimited video access</li>
                      <li>✅ Priority customer support</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="membership-upgrade">
                  <div className="upgrade-offer">
                    <h3>Upgrade to Premium Membership</h3>
                    <div className="upgrade-price">18,800 FRW</div>
                    <button 
                      className="action-btn purchase-btn full-width" 
                      onClick={() => setShowMembershipModal(true)}
                    >
                      <span className="btn-icon">💎</span>
                      <span>Purchase Premium Membership</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        
        {activeTab === 'profile' && (
          <div className="dashboard-box dashboard-enhanced">
            <h2 className="dashboard-title">👤 Profile Information</h2>
            <div className="profile-info">
              <div className="profile-field">
                <label>Username:</label>
                <span>{user.username}</span>
              </div>
              <div className="profile-field">
                <label>Email:</label>
                <span>{user.email}</span>
              </div>
              <div className="profile-field">
                <label>Account Type:</label>
                <span>{user.hasMembership ? 'Premium Member' : 'Basic Account'}</span>
              </div>
              <div className="profile-field">
                <label>Videos Watched:</label>
                <span>{user.videosWatched}</span>
              </div>
              <div className="profile-field">
                <label>Total Earnings:</label>
                <span>{user.balance.toLocaleString()} FRW</span>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Membership Modal */}
      {showMembershipModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="modal-title">💎 Premium Membership Required</h3>
            <div className="membership-info">
              <p><strong>Unlock Premium Features:</strong></p>
              <ul>
                <li>✅ Instant cashout access</li>
                <li>✅ Earn 20,000 FRW per video daily</li>
                <li>✅ Unlimited video access</li>
                <li>✅ Priority customer support</li>
              </ul>
              
              <div className="membership-price">
                <span className="price-label">Membership Card Fee:</span>
                <span className="price-value">18,800 FRW</span>
              </div>
              
              <div className="payment-instructions">
                <p><strong>Payment Instructions:</strong></p>
                <p>Pay 18,800 FRW to MTN Mobile Money: <strong>1818306</strong></p>
                <p>Then click "Activate Membership" below</p>
              </div>
            </div>
            
            <div className="modal-buttons">
              <button 
                className="modal-btn purchase-btn" 
                onClick={purchaseMembership}
                disabled={loading}
              >
                {loading ? 'Processing...' : '💳 Activate Membership'}
              </button>
              <button 
                className="modal-btn cancel-btn" 
                onClick={() => setShowMembershipModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Cashout Modal */}
      {showCashoutModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="modal-title">💰 Cashout Request</h3>
            <div className="cashout-info">
              <p>You are about to withdraw:</p>
              <div className="cashout-amount">{user.balance.toLocaleString()} FRW</div>
              <p>Payment will be sent to your registered MTN Mobile Money number within 24 hours.</p>
            </div>
            
            <div className="modal-buttons">
              <button 
                className="modal-btn confirm-btn" 
                onClick={processCashout}
                disabled={loading}
              >
                {loading ? 'Processing...' : '✅ Confirm Cashout'}
              </button>
              <button 
                className="modal-btn cancel-btn" 
                onClick={() => setShowCashoutModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
