const express = require("express")
const router = express.Router();
const emergencyController = require("../controllers/emergencyController")


// Endpoint for the symptom checker
router.post("/",emergencyController.getEmergencyContacts);

module.exports =router;