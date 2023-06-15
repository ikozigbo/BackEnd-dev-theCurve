const express = require("express");
const router = express.Router();
const multer = require("multer");
const fileFilter = require("./config/fileFIlterConfig");
const uploadMiddleware = multer({
  dest: "uploads/",
  limits: {
    fileSize: 100000000,
  },
  fileFilter,
});
const {
  newFamily,
  getFamilies,
  getOneFamilyById,
  getAndUpdate,
  deleteFamily,
} = require("./controllers/controller");

router.post("/family", uploadMiddleware.array("pictures"), newFamily);
router.get("/family/:id", getOneFamilyById);
router.get("/family", getFamilies);
router.put("/family/:id", uploadMiddleware.array("pictures"), getAndUpdate);
router.delete("/family/:id", deleteFamily);

module.exports = router;
