const User = require('../models/userModel'); // Import the User model
/**
 * Controller function to add a new user.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
exports.addUser = async (req, res) => {
// Destructure email, firstName, and lastName from the request body
  const { email, firstName, lastName } = req.body;
// Check if email is provided, return a 400 Bad Request response if not
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
  // Create a new User instance with the provided data and initialize an empty chatHistory
    const user = new User({ email, firstName, lastName, chatHistory: [] });
  // Save the user to the database
    await user.save();
  // Send a 201 Created response indicating successful user creation
    res.status(201).json({ message: 'User added successfully' });
  } catch (error) {
    console.error(error);
  // Send a 500 Internal Server Error response in case of an error
    res.status(500).json({ error: 'An error occurred while adding the user' });
  }
};
