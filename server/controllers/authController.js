const db = require('../database');
const bcrypt = require('bcrypt');

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

    const checkUsernameSQL = 'SELECT * FROM Users WHERE username = ?';
    db.query(checkUsernameSQL, [username], (checkErr, checkResult) => {
      if (checkErr) {
        console.error(checkErr);
        return res.status(500).json({ message: 'Registration failed' });
      }

      if (checkResult.length > 0) {
        return res.status(400).json({ message: 'Username is already taken' });
      }

      bcrypt.hash(password, 10, (hashErr, hashedPassword) => {
        if (hashErr) {
          console.error(hashErr);
          return res.status(500).json({ message: 'Registration failed' });
        }

        const insertUserSQL =
          'INSERT INTO Users (username, password, phone_number, full_name, language, educational_status, interest, location, work_experience) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        db.query(
          insertUserSQL,
          [
            username,
            hashedPassword,
            phone_number,
            full_name,
            language,
            educational_status,
            interest,
            location,
            work_experience,
          ],
          (insertErr, insertResult) => {
            if (insertErr) {
              console.error(insertErr);
              return res.status(500).json({ message: 'Registration failed' });
            }
            console.log('User registered:', insertResult);
            return res.status(201).json({ message: 'Registration successful' });
          }
        );
      });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.signin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const findUserSQL = 'SELECT * FROM Users WHERE username = ?';
    db.query(findUserSQL, [username], async (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Sign-in failed' });
      }

      if (results.length === 0) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const user = results[0];
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      return res.status(200).json({ message: 'Sign-in successful' });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = exports;
