const express = require('express');
const transcribeController = require('../controllers/transcribeController');

const router = express.Router();

router.post('/transcribe', transcribeController.audioTranscription);

module.exports = router;