const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Database connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: ''
});

connection.connect((err) => {
  if (err) throw err;
  
  // Create database if it doesn't exist
  connection.query('CREATE DATABASE IF NOT EXISTS on_africa_db', (err) => {
    if (err) throw err;
    console.log('Database created or already exists');
    
    // Use the database
    connection.query('USE on_africa_db', (err) => {
      if (err) throw err;
      
      // Create users table
      const createTableSQL = `
        CREATE TABLE IF NOT EXISTS users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          username VARCHAR(255) NOT NULL,
          phone VARCHAR(20) NOT NULL,
          email VARCHAR(255) NOT NULL UNIQUE,
          password VARCHAR(255) NOT NULL,
          payment_screenshot VARCHAR(255) NOT NULL,
          registration_fee DECIMAL(10,2) DEFAULT 3900.00,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `;
      
      connection.query(createTableSQL, (err) => {
        if (err) throw err;
        console.log('Users table created or already exists');
      });
    });
  });
  
  console.log('Connected to MySQL database');
});

// File upload configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
});

const upload = multer({ storage: storage });

// Routes
app.post('/api/register', upload.single('screenshot'), async (req, res) => {
  try {
    const { username, phone, email, password } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ message: 'Payment screenshot is required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const screenshotPath = req.file.path;

    const sql = 'INSERT INTO users (username, phone, email, password, payment_screenshot, registration_fee) VALUES (?, ?, ?, ?, ?, 3900)';
    db.query(sql, [username, phone, email, hashedPassword, screenshotPath], (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error registering user' });
      }
      
      res.status(201).json({ 
        message: 'Registration successful', 
        bonusAmount: 7500 
      });
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], async (err, results) => {
      if (err) throw err;

      if (results.length === 0) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const user = results[0];
      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { userId: user.id, username: user.username },
        'your_jwt_secret',
        { expiresIn: '24h' }
      );

      res.json({
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          bonusAmount: 7500
        }
      });
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});