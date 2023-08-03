const express = require("express");
const upload = require("../utilities/multer");
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
  addProfilePicture,
} = require("../controller/userController");

const { isAdmin, userAuth } = require("../middlewares/authmiddleware");
const { validationMiddleware } = require("../middlewares/validator");
const router = express.Router();

router.post("/signup", validationMiddleware, newUser);

router.put("/verify/:token", userVerify);
router.post("/signin", signin);
router.get("/logout", userAuth, logout);
router.get("/getall", userAuth, getAll);
router.put("/update-user/:userId", userAuth, updateUserName);
router.delete("/delete-user/:userId", userAuth, deleteUser);
router.put("/add-profile-image", userAuth, addProfilePicture);
router.get("/forgot-password", forgotPassword);
router.get("/resend-email-verification", resendEmailVerification);
router.put("/reset-password/:token", resetpassword);
module.exports = router;
