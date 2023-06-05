const express = require("express");
const { newCollection, viewAll, updateInfo } = require("../controller/bag");

const router = express.Router();
router.route("/new").post(newCollection);
router.route("/view").get(viewAll);
router.route("/update/:id").put(updateInfo);
module.exports = router;
