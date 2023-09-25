const db = require('../database');

exports.signup = (req, res) => {
  try {
    const { username, email, password } = req.body;

    const sql = 'INSERT INTO Users (username, email, password) VALUES (?, ?, ?)';
    db.query(sql, [username, email, password], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Registration failed' });
      }
      console.log('User registered:', result);
      return res.status(201).json({ message: 'Registration successful' });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
