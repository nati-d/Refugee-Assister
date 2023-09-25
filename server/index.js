// server.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

const userRoutes = require('./routes/authRoutes');
app.use('/api/users', userRoutes);

const authRoute = require('./routes/authRoutes');
app.use('/auth', authRoute);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
