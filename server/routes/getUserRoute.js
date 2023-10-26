// getUserRoute.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/getUserController'); // Import the controller

// Define a route to get user details by email
router.get('/', userController.getUserDetails);

module.exports = router;
