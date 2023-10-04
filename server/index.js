// server.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const userRoutes = require('./routes/authRoutes');
app.use('/api/users', userRoutes);

const authRoute = require('./routes/authRoutes');
app.use('/auth', authRoute);

const chatRoutes = require("./routes/chatRoutes");
app.use("/chat",chatRoutes)



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
