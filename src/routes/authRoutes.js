
const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { register, login, getMe } = require("../controllers/authController");
const {
    registerValidator,
    loginValidator
} = require("../validators/authValidator");

const router = express.Router();

router.post("/register", registerValidator, register);
router.post("/login", loginValidator, login);
router.get("/me", authMiddleware, getMe);

module.exports = router;
