// getUserController.js

const User = require('../models/userModel'); // Import the User model

const getUserDetails = async (req, res) => {
  try {
    const userEmail = req.query.userEmail;
    const user = await User.findOne({ email: userEmail });

    if (user) {
      res.status(200).json({ user });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

module.exports = {
  getUserDetails,
};
