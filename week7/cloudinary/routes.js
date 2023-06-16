const express = require("express");
const router = express.Router();
const { newContact } = require("./controllers/controller");
//const multer = require("multer");
//const upload = multer({ dest: "uploads/" });

router.post("/profile", newContact);

module.exports = router;
