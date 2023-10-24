const express = require("express");
const router = express.Router();
const hospitalInfoController = require("../controllers/hospitalInfoController");

// Define a route to get information about a specific hospital
router.get("/", hospitalInfoController.getHospitalInfo);

module.exports = router;
