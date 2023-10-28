const mongoose = require('mongoose');

// Define the structure of the journal document using a Mongoose schema
const journalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // Title is a required field
  },
  content: {
    type: String,
    required: true, // Content is a required field
  },
  date: {
    type: Date,
    default: Date.now, // Date is a Date type with a default value of the current date and time
  },
  userEmail: {
    type: String,
    required: true, // userEmail is a required field
  },
});

// Create a Mongoose model named 'Journal' based on the defined schema
const Journal = mongoose.model('Journal', journalSchema);

// Export the 'Journal' model to be used in other parts of the application
module.exports = Journal;
