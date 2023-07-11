const {
  register,
  login,
  landingPage,
  logout,
} = require("../controllers/userController");
const express = require("express");
const { userAuth } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/newuser", register);
router.post("/login", login);
router.get("/home", userAuth, landingPage);
router.get("/logout", logout);

module.exports = router;
