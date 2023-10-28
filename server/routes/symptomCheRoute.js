const express = require("express");
const router = express.Router();

// Import the controller responsible for handling symptom checker requests
const symptomCheckerController = require("../controllers/symptomCheController");

// Define a route for handling POST requests to the root path of this router
router.post("/", symptomCheckerController.checkSymptom);

// Export the router to be used in other parts of the application
module.exports = router;
