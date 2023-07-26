const express = require("express");
const router = express.Router();
const {
  upgradeUserToAdmin,
  signupAdmin,
  blockUser,
  unblockUser,
  getAllBlockedUsers,
} = require("../controller/adminController");
const { isAdmin, userAuth } = require("../middlewares/authmiddleware");

// these routes are the admin privilages
//router.post("/signup-admin", signupAdmin);
router.put("/upgrade-to-admin/:userId", userAuth, isAdmin, upgradeUserToAdmin);
router.put("/blockUser", userAuth, isAdmin, blockUser);
router.put("/unblockUser", userAuth, isAdmin, unblockUser);
router.get("/get-blocked", userAuth, isAdmin, getAllBlockedUsers);
module.exports = router;
