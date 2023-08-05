const express = require("express");
const { userAuth, isAdmin } = require("../middlewares/authmiddleware");
const {
  createCarRental,
  findCarRentals,
  findOneCarRental,
  deleteCarRental,
} = require("../controller/carRentalController");

const router = express.Router();

router.post("/create-car-rental", createCarRental);
router.get("/find-car-rentals", findCarRentals);
router.get("/car-rental/:carRentalId", findOneCarRental);
router.delete("/delete-car-rental/:carRentalId", deleteCarRental);

module.exports = router;
