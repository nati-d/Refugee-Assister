// server.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors')
require('dotenv').config();

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

const chatRoutes = require("./routes/chatRoutes");
app.use("/chat",chatRoutes)

const audioRoutes = require('./routes/audio');
app.use('/api/audio', audioRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
