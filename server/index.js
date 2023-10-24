const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors')
require('dotenv').config();
const mongoose = require('mongoose');

app.use(cors())
app.use(bodyParser.json());

const port = process.env.PORT || 3000;


app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
mongoose.connect(process.env.MONGO_URI, { dbName: 'Assister', useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log('Connected to MongoDB Successfully');
}).catch((err) => {
  console.error(err);
});

const userRoutes = require('./routes/userRoute');
app.use('/addUser', userRoutes);

const chatRoutes = require("./routes/chatRoutes");
app.use("/chat",chatRoutes)

const transcribeRoutes = require("./routes/transcribeRoute");
app.use("/api/audio", transcribeRoutes);

const symptomCheckerRoute = require("./routes/symptomCheRoute")
app.use("/symptomChecker",symptomCheckerRoute)

const emergencyRoute = require("./routes/emergencyRoute")
app.use("/emergency",emergencyRoute)

const hospitalRoutes = require("./routes/hospitalRoute");
app.use("/hospitals", hospitalRoutes);

const hospitalInfoRoute = require("./routes/hospitalInfoRoute");
app.use("/hospital-info", hospitalInfoRoute);

const chatHistoryRoute = require('./routes/chatHistoryRoute'); 
app.use('/chatHistory', chatHistoryRoute);



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
