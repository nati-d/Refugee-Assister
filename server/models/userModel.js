const mongoose = require('mongoose');

// Define the structure of the user document using a Mongoose schema
const userSchema = new mongoose.Schema({
  firstName: String, // First name of the user (String)
  lastName: String,  // Last name of the user (String)
  email: String,     // Email address of the user (String)
  chatHistory: [
    {
      role: String,    // Role of the message (e.g., 'user' or 'assistant')
      content: String, // Content of the message (String)
      timestamp: Date,  // Timestamp of the message (Date)
    }
  ],
}, { collection: 'users' });

// Create a Mongoose model named 'User' based on the defined schema
const User = mongoose.model('User', userSchema);

// Export the 'User' model to be used in other parts of the application
module.exports = User;
