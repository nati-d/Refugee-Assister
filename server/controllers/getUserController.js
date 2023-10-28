// Import the User model from '../models/userModel'
const User = require('../models/userModel');

/**
 * Asynchronous function to retrieve user details by email
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
const getUserDetails = async (req, res) => {
  try {
    // Extract the user's email from the query parameter in the request
    const userEmail = req.query.userEmail;

    // Search for the user in the database by their email
    const user = await User.findOne({ email: userEmail });

    // Check if the user is found in the database
    if (user) {
      // Respond with a JSON object containing the user details
      res.status(200).json({ user });
    } else {
      // Respond with a "User not found" error message if the user is not found
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    // Handle errors, log them, and respond with a generic error message
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

// Export the controller function as an object with the name 'getUserDetails'
module.exports = {
  getUserDetails,
};
