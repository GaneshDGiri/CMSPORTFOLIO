const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/authMiddleware');
const upload = require('../config/upload');

// GET Profile - Fetches the first user found (Admin)
router.get('/', async (req, res) => {
  try {
    const user = await User.findOne().select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT (Update) Profile - Accessible only by logged-in Admin
router.put('/', auth, upload.single('image'), async (req, res) => {
  try {
    const { 
      name, bio, skills, github, linkedin, gmail, phone, address 
    } = req.body;

    // Build the update object
    let updateData = {
      name,
      bio,
      github,
      linkedin,
      gmail,
      phone,
      address,
      // Convert skills string back to array if sent as FormData
      skills: typeof skills === 'string' ? skills.split(',').map(s => s.trim()) : skills
    };

    // If a new image file was uploaded, update the path
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    // Update the user using the ID from the Auth Middleware
    const updatedUser = await User.findByIdAndUpdate(
      req.user.userId, 
      { $set: updateData }, 
      { new: true }
    ).select('-password');

    res.json(updatedUser);
  } catch (err) {
    console.error("Profile Update Error:", err);
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;