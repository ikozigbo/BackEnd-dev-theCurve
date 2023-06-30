const express = require("express");
const router = express.Router();
const {
  newBranch,
  getAllBranches,
  getOneBranch,
  updateBranch,
  deleteBranch,
} = require("./controllers/branchController");
const {
  newMenu,
  updateMenu,
  deleteMenu,
} = require("./controllers/menuContoller");
const { validateBranch, validateMenu } = require("./middleware/personValidate");

router.post("/restaurant", validateBranch, newBranch);
router.get("/restaurant/:id", getOneBranch);
router.get("/restaurant", getAllBranches);
router.put("/restaurant/:id", updateBranch);
router.delete("/restaurant/:id", deleteBranch);

////menu
router.post("/createmenu", validateMenu, newMenu);
router.put("/updatemeu", updateMenu);
router.delete("/deletemenu/:id", deleteMenu);

module.exports = router;
