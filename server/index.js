const express = require('express');
const mongoose = require('mongoose');
const app = express();

const dbUrl ="mongodb+srv://nathnaeldesalegn94:16381735@natdb.az1b1zx.mongodb.net/NatDb?retryWrites=true&w=majority";

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.get('/check-mongoose-connection', (req, res) => {
  if (db.readyState === 1) {
    res.send('Mongoose is connected to MongoDB.');
  } else {
    res.send('Mongoose is not connected to MongoDB.');
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
