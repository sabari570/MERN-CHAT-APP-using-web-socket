const { Router } = require("express");
const { sendMessage, getMessages } = require("../controllers/messageController");
const { requireAuth } = require("../middlewares/authMiddleware");

const router = Router();

// router to send a message
router.post('/send/:id', requireAuth, sendMessage);

// router to get a message between 2 users
router.get('/:id', requireAuth, getMessages);

module.exports = router;