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
  updateUser,
  upgradeUserToAdmin,
  upgradeUserToSuperAdmin,
} = require("../controller/userController");
const {
  isAdmin,
  userAuth,
  isSuperAdmin,
} = require("../middlewares/authmiddleware");
const router = express.Router();

router.post("/signup", newUser);
router.put("/verify/:token", userVerify);
router.post("/signin", signin);
router.get("/logout", logout);
router.get("/getall", userAuth, getAll);
router.put("/update-user/:userId", userAuth, updateUser);
router.put("/upgrade-to-admin/:userId", userAuth, isAdmin, upgradeUserToAdmin);
router.put(
  "/upgrade-to-superadmin/:userId",
  userAuth,
  isSuperAdmin,
  upgradeUserToSuperAdmin
);
router.get("/forgot-password", forgotPassword);
router.get("/resend-email-verification", resendEmailVerification);
router.put("/reset-password/:token", resetpassword);
module.exports = router;
