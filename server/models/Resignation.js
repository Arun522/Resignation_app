const mongoose = require('mongoose');

const resignationSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  lwd: { type: String, required: true }, // "YYYY-MM-DD"
  status: { type: String, default: 'pending' }, // "pending", "approved", "rejected"
  reason: { type: String }, // optional if you want a reason field
});

module.exports = mongoose.model('Resignation', resignationSchema);
