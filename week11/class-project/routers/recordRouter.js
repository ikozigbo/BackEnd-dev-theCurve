const express = require("express");
const {
  createRecord,
  getRecords,
  getRecord,
  getAllLoggedInRecords,
  updateRecord,
  deleteRecord,
} = require("../controller/recordController");
const { userAuth, isAdmin } = require("../middlewares/authmiddleware");
const router = express.Router();

router.post("/records", userAuth, createRecord);
router.get("/records", userAuth, getRecords);
router.get("/loggedin-records", getAllLoggedInRecords);

router
  .route("/records/:id", userAuth)
  .get(getRecord)
  .put(updateRecord)
  .delete(deleteRecord);

module.exports = router;
