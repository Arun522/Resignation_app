const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  username: { type: String, required: true, unique: true },
  email: { type: String },
  country: { type: String, default: 'US' },
  password: { type: String, required: true },
  role: { type: String, default: 'employee' },
});

module.exports = mongoose.model('User', userSchema);
