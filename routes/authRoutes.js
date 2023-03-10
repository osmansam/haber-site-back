const express = require("express");
const router = express.Router();
const {
  register,
  login,
  logout,
  resetPassword,
} = require("../controllers/authController");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/reset-password").post(resetPassword);

module.exports = router;
