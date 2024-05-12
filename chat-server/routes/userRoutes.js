const { Router } = require("express");
const { requireAuth } = require("../middlewares/authMiddleware");
const { getRegisteredUser } = require("../controllers/userController");


const router = Router();

// route to getting the registered users
router.get('/', requireAuth, getRegisteredUser);

module.exports = router;
