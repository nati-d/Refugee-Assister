// userController.js
const db = require('../database');

exports.signup = (req, res) => {
  try {
    const {
      username,
      password,
      phone_number,
      full_name,
      language,
      educational_status,
      interest,
      location,
      work_experience,
    } = req.body;

    // Insert user into the database
    const sql =
      'INSERT INTO Users (username, password, phone_number, full_name, language, educational_status, interest, location, work_experience) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(
      sql,
      [
        username,
        password,
        phone_number,
        full_name,
        language,
        educational_status,
        interest,
        location,
        work_experience,
      ],
      (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Registration failed' });
        }
        console.log('User registered:', result);
        return res.status(201).json({ message: 'Registration successful' });
      }
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
