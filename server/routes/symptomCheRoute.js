const express = require("express")
const router = express.Router();
const symptomCheckerController = require("../controllers/symptomCheController")


router.post("/",symptomCheckerController.checkSymptom);

module.exports =router;