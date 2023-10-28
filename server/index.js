const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors')
require('dotenv').config();
const mongoose = require('mongoose');

// Enable CORS and JSON request body parsing
app.use(cors())
app.use(bodyParser.json());

// Define the port for the server to listen on, using the environment variable or default to 3000
const port = process.env.PORT || 3000;

// Set up CORS headers to allow cross-origin requests
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
// Connect to the MongoDB database using the provided URI
mongoose.connect(process.env.MONGO_URI, { dbName: 'Assister', useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log('Connected to MongoDB Successfully');
}).catch((err) => {
  console.error(err);
});

// Define and configure routes for various features

// Route for adding a new user
const userRoutes = require('./routes/userRoute');
app.use('/addUser', userRoutes);

// Route for chat functionality
const chatRoutes = require('./routes/chatRoutes');
app.use('/chat', chatRoutes);

// Route for handling emergency contacts
const emergencyRoutes = require('./routes/emergencyRoute');
app.use('/emergency', emergencyRoutes);

// Route for symptom checking
const symptomCheckerRoute = require('./routes/symptomCheRoute');
app.use('/symptomChecker', symptomCheckerRoute);

// Route for hospital generator
// const hospitalRoutes = require('./routes/hospitalRoute');
// app.use('/hospitals', hospitalRoutes);
// Route for hospital info
// const hospitalInfoRoute = require('./routes/hospitalInfoRoute');
// app.use('/hospital-info', hospitalInfoRoute);

// Route for accessing chat history
const chatHistoryRoute = require('./routes/chatHistoryRoute');
app.use('/chatHistory', chatHistoryRoute);

// Route for getting user details
const getUserRoute = require('./routes/getUserRoute');
app.use('/getUser', getUserRoute);

// Route for journal entries
const journalRoutes = require('./routes/journalRoute');
app.use('/journals', journalRoutes);

// Route for funfact entries
const funFactRoute = require("./routes/funFactRoute")
app.use("/funFact", funFactRoute);



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});