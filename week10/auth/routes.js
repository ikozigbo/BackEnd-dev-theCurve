const express = require("express");
const { newUser } = require("./controller/userController");
const router = express.Router();

router.post("/signup", newUser);

module.exports = router;
