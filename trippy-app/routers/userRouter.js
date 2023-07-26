const express = require("express");
const {
  newUser,
  userVerify,
  signin,
  logout,
  getAll,
  forgotPassword,
  resetpassword,
  resendEmailVerification,
  updateUserName,
  deleteUser,
} = require("../controller/userController");
const {
  upgradeUserToAdmin,
  upgradeUserToSuperAdmin,
  signupAdmin,
} = require("../controller/adminController");
const {
  isAdmin,
  userAuth,
  isSuperAdmin,
} = require("../middlewares/authmiddleware");
const router = express.Router();

router.post("/signup", newUser);
router.post("/signup-admin", signupAdmin);
router.put("/verify/:token", userVerify);
router.post("/signin", signin);
router.get("/logout", userAuth, logout);
router.get("/getall", userAuth, getAll);
router.put("/update-user/:userId", userAuth, updateUserName);
router.delete("/delete-user/:userId", userAuth, deleteUser);
router.put("/upgrade-to-admin/:userId", userAuth, isAdmin, upgradeUserToAdmin);
router.get("/forgot-password", forgotPassword);
router.get("/resend-email-verification", resendEmailVerification);
router.put("/reset-password/:token", resetpassword);
module.exports = router;
