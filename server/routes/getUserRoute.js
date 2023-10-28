const express = require('express');
const router = express.Router();

// Import the controller responsible for handling user details requests
const userController = require('../controllers/getUserController');

// Define a route for handling GET requests to the root path of this router
router.get('/', userController.getUserDetails);

// Export the router to be used in other parts of the application
module.exports = router;
