const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/', userController.addUser);

module.exports = router;
