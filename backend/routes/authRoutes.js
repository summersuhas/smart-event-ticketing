const express = require("express");
const router = express.Router();

const {
  register,
  login,
  getMe,
} = require("../controllers/authController");
console.log(register);
console.log(login);

router.post("/register", register);
router.post("/login", login);

module.exports = router;
