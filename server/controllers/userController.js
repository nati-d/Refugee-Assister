const User = require('../models/userModel');

exports.addUser = async (req, res) => {
    const { email } = req.body; // Remove .email here
  
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }
  
    try {
      const user = new User({ email, chatHistory: [] });
      await user.save();
      res.status(201).json({ message: 'User added successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while adding the user' });
    }
  };
  
