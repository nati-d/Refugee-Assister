const express = require("express")
const router = express.Router();
const funFactController = require("../controllers/funfactController");


// Endpoint for the symptom checker
router.post("/",funFactController.getFunFact);

module.exports =router;