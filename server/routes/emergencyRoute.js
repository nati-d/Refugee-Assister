const express = require("express");
const router = express.Router();

// Import the controller responsible for handling emergency contact requests
const emergencyController = require("../controllers/emergencyController");

// Define a route for handling POST requests to the root path of this router
router.post("/", emergencyController.getEmergencyContacts);

// Export the router to be used in other parts of the application
module.exports = router;
