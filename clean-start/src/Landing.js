import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

const Landing = () => {
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  const names = useMemo(() => [
    'Sarah Johnson', 'David Smith', 'Maria Garcia', 'John Wilson', 'Anna Brown',
    'Michael Davis', 'Lisa Anderson', 'James Miller', 'Jennifer Taylor', 'Robert Johnson',
    'Patricia Wilson', 'Christopher Lee', 'Michelle Martin', 'Daniel Garcia', 'Jessica Davis',
    'Matthew Rodriguez', 'Ashley Martinez', 'Anthony Hernandez', 'Amanda Lopez', 'Mark Anderson',
    'Stephanie Thomas', 'Joshua Jackson', 'Melissa White', 'Andrew Harris', 'Deborah Martin',
    'Kenneth Thompson', 'Dorothy Garcia', 'Paul Martinez', 'Lisa Robinson', 'Steven Clark',
    'Nancy Rodriguez', 'Brian Lewis', 'Betty Lee', 'Edward Walker', 'Helen Hall',
    'Ronald Allen', 'Sandra Young', 'Donald King', 'Donna Wright', 'George Lopez',
    'Carol Hill', 'Kevin Scott', 'Ruth Green', 'Jason Adams', 'Sharon Baker',
    'Jeff Nelson', 'Cynthia Carter', 'Ryan Mitchell', 'Angela Perez', 'Jacob Roberts',
    'Brenda Turner', 'Gary Phillips', 'Emma Campbell', 'Nicholas Parker', 'Olivia Evans',
    'Eric Edwards', 'Megan Collins', 'Jonathan Stewart', 'Catherine Sanchez', 'Stephen Morris',
    'Samantha Rogers', 'Larry Reed', 'Debra Cook', 'Justin Bailey', 'Rachel Rivera',
    'Scott Cooper', 'Carolyn Richardson', 'Brandon Cox', 'Janet Howard', 'Benjamin Ward',
    'Virginia Torres', 'Samuel Peterson', 'Maria Gray', 'Gregory Ramirez', 'Heather James',
    'Frank Watson', 'Diane Brooks', 'Raymond Kelly', 'Julie Sanders', 'Alexander Price',
    'Joyce Bennett', 'Patrick Wood', 'Christina Barnes', 'Jack Ross', 'Kathleen Henderson',
    'Dennis Coleman', 'Amy Jenkins', 'Jerry Perry', 'Anna Powell', 'Tyler Long',
    'Frances Patterson', 'Aaron Hughes', 'Marie Flores', 'Henry Washington', 'Doris Butler',
    'Jose Simmons', 'Christina Foster', 'Douglas Gonzales', 'Jacqueline Bryant', 'Nathan Alexander',
    'Gloria Russell', 'Peter Griffin', 'Teresa Diaz', 'Zachary Hayes', 'Sara Myers',
    'Kyle Ford', 'Janice Hamilton', 'Walter Graham', 'Judy Sullivan', 'Harold Wallace',
    'Theresa Woods', 'Jeremy West', 'Cheryl Cole', 'Wayne Jordan', 'Mildred Owens',
    'Christian Reynolds', 'Katherine Fisher', 'Sean Ellis', 'Gloria Stone', 'Elijah Boyd',
    'Jean Mason', 'Ralph Hunt', 'Alice Dixon', 'Mason Rice', 'Madison Wells'
  ], []);

  const getRandomAmount = useCallback(() => {
    const amounts = [15000, 18000, 22000, 25000, 30000, 35000, 40000, 45000, 50000, 55000, 60000, 65000, 70000];
    return amounts[Math.floor(Math.random() * amounts.length)];
  }, []);

  const getRandomName = useCallback(() => {
    return names[Math.floor(Math.random() * names.length)];
  }, [names]);

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

    // Random notifications
    const notificationTimer = setInterval(() => {
      const newNotification = {
        id: Date.now() + Math.random(),
        name: getRandomName(),
        amount: getRandomAmount(),
        timestamp: Date.now()
      };
      
      setNotifications(prev => {
        const updated = [newNotification, ...prev].slice(0, 3); // Keep only 3 latest
        return updated;
      });
    }, 300000); // Show new notification every 5 minutes (300,000 milliseconds)

    return () => {
      clearInterval(timer);
      clearInterval(notificationTimer);
    };
  }, [getRandomName, getRandomAmount]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="landing-container">
      {/* Floating Notifications */}
      <div className="floating-notifications">
        {notifications.map(notification => (
          <div key={notification.id} className="earning-notification">
            <div className="notification-content">
              <span className="notification-icon">🎉</span>
              <div className="notification-text">
                <strong>{notification.name}</strong> has earned <strong>{notification.amount.toLocaleString()} FRW</strong>
              </div>
            </div>
          </div>
        ))}
      </div>

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
      </div>
    </div>
  );
};

export default Landing;