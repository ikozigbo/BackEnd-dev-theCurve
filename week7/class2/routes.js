const express = require("express");
const router = express.Router();
const multer = require("multer");
const uploadMiddleware = multer({
  dest: "uploads/",
  limits: {
    fileSize: 100000000,
  },
});
const { newProfile } = require("./controllers/controller");

router.post("/profile", uploadMiddleware.single("file"), newProfile);
// router.get("/restaurant/:branch", getOneByBranch);
// router.get("/restaurant", getAllRestaurants);
// router.post("/restaurant/:id", );
// router.delete("/restaurant/:id", );

module.exports = router;
