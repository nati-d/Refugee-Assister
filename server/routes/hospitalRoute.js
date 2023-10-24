const express = require("express");
const router = express.Router();
const hospitalController = require("../controllers/hospitalController");

// Define a route to generate hospitals in a city
router.post("/", hospitalController.generateHospitals);

module.exports = router;
