const express = require("express");
const {
  createHotel,
  searchHotels,
  updateHotelById,
  deleteHotelById,
  findHotelById,
  hotelRating,
  deleteHotelRating,
} = require("../controller/hotelController");
const { userAuth, isAdmin } = require("../middlewares/authmiddleware");
const router = express.Router();

router.post("/create-hotel", createHotel);
router.get("/find-hotels", searchHotels);
router.get("/findone-hotel", findHotelById);
router.put("/update-hotel/:id", updateHotelById);
router.put("/rate-hotel/:hotelId", userAuth, hotelRating);
router.put("/deletehotel-rating/:hotelId", userAuth, deleteHotelRating);
router.delete("/delete-hotel/:id", deleteHotelById);

module.exports = router;
