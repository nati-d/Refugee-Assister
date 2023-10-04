const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatbController");

router.post("/", chatController.chat);

module.exports = router;