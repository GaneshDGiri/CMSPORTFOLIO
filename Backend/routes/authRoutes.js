const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User'); 

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // ==========================================
    // 1. MASTER OVERRIDE: Hardcoded Admin Check
    // ==========================================
    // This ignores the database entirely and guarantees you can log in
    if (email === 'Gani' && password === 'Gani@3010') {
      const payload = { userId: 'admin_123' }; 
      
      if (!process.env.JWT_SECRET) {
          console.error("Missing JWT_SECRET in .env");
          return res.status(500).json({ message: 'Server configuration error' });
      }

      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
      console.log("Success! Master Admin logged in.");
      
      return res.json({ 
        token, 
        user: { username: 'Gani', name: 'Ganesh Giri' } 
      });
    }

    // ==========================================
    // 2. Standard Database Check
    // ==========================================
    // If you ever add normal users later, they will be checked here
    let user = await User.findOne({ username: email });
    
    // (Note: If using bcrypt later, you'd use bcrypt.compare here)
    if (!user || user.password !== password) {
       console.log("Database login failed for:", email);
       return res.status(401).json({ message: 'Invalid credentials' });
    }

    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
    
    res.json({ token, user: { username: user.username, name: user.name } });

  } catch (err) {
    console.error("Login 500 Error:", err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
