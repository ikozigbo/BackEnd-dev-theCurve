const express = require("express");
const router = express.Router();
const {
  newResturant,
  getOneByBranch,
  getAllRestaurants,
} = require("../controllers/restaurantController");

router.post("/restaurant", newResturant);
router.get("/restaurant/:branch", getOneByBranch);
router.get("/restaurant", getAllRestaurants);
// router.post("/restaurant/:id", );
// router.delete("/restaurant/:id", );

module.exports = router;
