const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, default: 'Ganesh' },
  bio: { type: String, default: 'Full Stack Developer' },
  skills: { type: [String], default: [] },
  image: { type: String, default: '' },
  // New Contact Fields
  github: { type: String, default: '' },
  linkedin: { type: String, default: '' },
  gmail: { type: String, default: '' },
  phone: { type: String, default: '' },
  address: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);