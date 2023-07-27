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
router.put("/upgrade-to-admin", userAuth, isAdmin, upgradeUserToAdmin);
router.put("/blockuser", userAuth, isAdmin, blockUser);
router.put("/unblockuser", userAuth, isAdmin, unblockUser);
router.get("/get-blocked", userAuth, isAdmin, getAllBlockedUsers);
module.exports = router;
