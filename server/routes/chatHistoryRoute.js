const express = require('express');
const router = express.Router();
const getChatHistoryController = require('../controllers/getChatHistoryController');

router.get('/', getChatHistoryController.getChatHistory);

module.exports = router;
