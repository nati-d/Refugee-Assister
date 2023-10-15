const express = require("express")
const router = express.Router();
const symptomCheckerController = require("../controllers/symptomCheController")


// Endpoint for the symptom checker
router.post("/",symptomCheckerController.checkSymptom);

module.exports =router;