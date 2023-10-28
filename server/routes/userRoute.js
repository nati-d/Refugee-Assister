const express = require('express');
const router = express.Router();

// Import the controller responsible for adding a new user
const userController = require('../controllers/userController');

// Define a route for handling POST requests to the root path of this router
router.post('/', userController.addUser);

// Export the router to be used in other parts of the application
module.exports = router;
