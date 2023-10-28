const express = require("express");
const router = express.Router();

// Import the controller responsible for generating hospitals in a city
const hospitalController = require("../controllers/hospitalController");

// Define a route for handling POST requests to the root path of this router
router.post("/", hospitalController.generateHospitals);

// Export the router to be used in other parts of the application
module.exports = router;
