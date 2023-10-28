const express = require("express");
const router = express.Router();

// Import the controller responsible for handling chat requests
const chatController = require("../controllers/chatbController");

// Define a route for handling POST requests to the root path of this router
router.post("/", chatController.chat);

// Export the router to be used in other parts of the application
module.exports = router;
