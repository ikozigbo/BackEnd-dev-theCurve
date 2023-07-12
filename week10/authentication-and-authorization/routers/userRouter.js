const express = require("express");
const {
  newUser,
  userVerify,
  signin,
  logout,
  getAll,
} = require("../controller/userController");
const {
  isAdmin,
  isSuperAdmin,
  userAuth,
} = require("../middlewares/authmiddleware");
const router = express.Router();

router.post("/signup", newUser);
router.put("/verify/:id", userVerify);
router.post("/signin", signin);
router.get("/logout", logout);
router.get("/getall", userAuth, isAdmin, getAll);
module.exports = router;
