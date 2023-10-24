const User = require('../models/userModel');

// Controller to fetch chat history for a user
exports.getChatHistory = async (req, res) => {
  const userEmail = req.query.userEmail; // Retrieve the user's email from the query parameter

  try {
    // Find the user by their email and return their chat history
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const chatHistory = user.chatHistory; // Assuming 'chatHistory' is an array in your User model

    res.json({ chatHistory });
  } catch (error) {
    console.error('Error fetching chat history:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};
