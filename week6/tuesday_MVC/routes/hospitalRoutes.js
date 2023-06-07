const express = require("express");
const router = express.Router();
const {
  newPatient,
  getOnePatient,
  getAllPatients,
  updatePatient,
  deletePatient,
} = require("../controllers/hospitalController");

router.post("/patients", newPatient);
router.get("/patients/:id", getOnePatient);
router.get("/patients", getAllPatients);
router.post("/update/:id", updatePatient);
router.delete("/patients/:id", deletePatient);

module.exports = router;
