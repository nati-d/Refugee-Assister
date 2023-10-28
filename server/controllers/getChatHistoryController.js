// Import the User model from '../models/userModel'
const User = require('../models/userModel');

// Controller to fetch chat history for a user
exports.getChatHistory = async (req, res) => {
  // Retrieve the user's email from the query parameter in the request
  const userEmail = req.query.userEmail;

  try {
    // Find the user by their email and return their chat history
    const user = await User.findOne({ email: userEmail });

    // Check if the user is not found in the database
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Assuming 'chatHistory' is an array in your User model, extract the chat history
    const chatHistory = user.chatHistory;

    // Respond with the user's chat history as a JSON object
    res.json({ chatHistory });
  } catch (error) {
    // Handle errors, log them, and respond with an error message
    console.error('Error fetching chat history:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};
