const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');
const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  // Validate input
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }
  
  try {
    // Check if user exists
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      
      if (results.length === 0) {
        // New user: Create account with hashed password
        try {
          const hashedPassword = await bcrypt.hash(password, 10);
          db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            
            const userId = result.insertId;
            const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token, user: { id: userId, email }, isNew: true });
          });
        } catch (error) {
          return res.status(500).json({ error: 'Error hashing password' });
        }
      } else {
        // Existing user: Check password
        const user = results[0];
        
        // Check if password exists in database
        if (!user.password) {
          return res.status(400).json({ message: 'Account exists but password not set. Please contact support.' });
        }
        
        try {
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect password' });
          }
          
          const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
          res.json({ token, user: { id: user.id, email: user.email }, isNew: false });
        } catch (error) {
          return res.status(500).json({ error: 'Error verifying password' });
        }
      }
    });
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
});

router.post('/logout', (req, res) => {
  res.json({ message: 'Logged out' });
});

module.exports = router;