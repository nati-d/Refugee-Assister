// backend/routes/audio.js
const express = require('express');
const router = express.Router();
const audioController = require('../controllers/audioController');

// Define the route to transcribe audio
router.post('/transcribe', audioController.transcribeAudio);

module.exports = router;
