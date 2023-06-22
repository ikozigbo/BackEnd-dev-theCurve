const express = require("express");
const router = express.Router();
const upload = require("./utils/multer");
const {
  createProfile,
  getProfiles,
  getProfile,
  updateProfile,
  deleteProfile,
} = require("./controllers/controller");
const {
  validatePerson,
  updateValidation,
} = require("./middleware/personValidate");

router.post(
  "/create",
  upload.single("personProfile"),
  validatePerson,
  createProfile
);
router.get("/profiles", getProfiles);
router.get("/profiles/:id", getProfile);
router.put(
  "/profiles/:id",
  upload.single("personProfile"),
  updateValidation,
  updateProfile
);
router.delete("/profiles/:id", upload.single("profileImage"), deleteProfile);

module.exports = router;
