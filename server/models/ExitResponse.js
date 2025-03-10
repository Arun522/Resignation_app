const mongoose = require('mongoose');

const responseItemSchema = new mongoose.Schema({
  questionText: String,
  response: String,
});

const exitResponseSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  responses: [responseItemSchema],
});

module.exports = mongoose.model('ExitResponse', exitResponseSchema);
