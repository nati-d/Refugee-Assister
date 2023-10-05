// server.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors')
require('dotenv').config();


app.use(bodyParser.json());
app.use(cors())

const chatRoutes = require("./routes/chatRoutes");
app.use("/chat",chatRoutes)



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
