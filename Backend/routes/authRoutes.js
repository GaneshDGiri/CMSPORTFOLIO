const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(`\n--- Login Attempt for: ${username} ---`); 

    let user = await User.findOne({ username });
    
    // Auto-create OR Force-Update Admin: Gani / Gani@3010
    if (username === 'Gani') {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('Gani@3010', salt);
      
      if (!user) {
        console.log("User not found. Creating 'Gani' admin account...");
        user = new User({ username: 'Gani', password: hashedPassword, name: 'Ganesh' });
        await user.save();
      } else {
        console.log("User found. Force-resetting password in database to match Gani@3010...");
        user.password = hashedPassword;
        await user.save();
      }
    } else if (!user) {
      console.log("Failed: Username not found in database.");
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    // Compare the password typed in the frontend with the database hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Failed: Passwords do not match.");
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    const payload = { userId: user._id };
    
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is missing from the .env file!");
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
    
    console.log("Success! Token generated and sent to frontend.");
    res.json({ token, user: { username: user.username, name: user.name } });
  } catch (err) {
    console.error("Login 500 Error:", err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;