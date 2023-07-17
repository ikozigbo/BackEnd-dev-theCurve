const express = require("express");
const {
  newUser,
  userVerify,
  signin,
  logout,
  getAll,
  forgotPassword,
  resetpassword,
} = require("../controller/userController");
const {
  isAdmin,
  isSuperAdmin,
  userAuth,
} = require("../middlewares/authmiddleware");
const router = express.Router();

router.post("/signup", newUser);
router.put("/verify/:token", userVerify);
router.post("/signin", signin);
router.get("/logout", logout);
router.get("/getall", userAuth, isAdmin, getAll);
router.get("/forgot-password", forgotPassword);
router.put("/reset-password/:token", resetpassword);
module.exports = router;
