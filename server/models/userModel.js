const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: String,
  chatHistory: [{ role: String, content: String, timestamp: Date }],
});

module.exports = mongoose.model('User', userSchema);
