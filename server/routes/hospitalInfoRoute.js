const express = require("express");
const router = express.Router();

// Import the controller responsible for handling hospital information requests
const hospitalInfoController = require("../controllers/hospitalInfoController");

// Define a route for handling GET requests to the root path of this router
router.get("/", hospitalInfoController.getHospitalInfo);

// Export the router to be used in other parts of the application
module.exports = router;
