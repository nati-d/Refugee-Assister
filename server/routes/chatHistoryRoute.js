const express = require('express');
const router = express.Router();

// Import the controller responsible for handling chat history requests
const getChatHistoryController = require('../controllers/getChatHistoryController');

// Define a route for handling GET requests to the root path of this router
router.get('/', getChatHistoryController.getChatHistory);

// Export the router to be used in other parts of the application
module.exports = router;
