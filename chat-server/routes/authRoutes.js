const { Router } = require("express");
const { login, register, logout } = require("../controllers/authController");

const router = Router();

// route for registering user
router.post("/signup", register);

// route for logging users in
router.post("/login", login);

// route for logging users out
router.post("/logout", logout);

module.exports = router;
