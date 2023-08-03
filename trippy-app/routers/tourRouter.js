const express = require("express");
const {
  createTour,
  searchTours,
  updateTourById,
  deleteTourById,
  findTourById,
  tourRating,
  deleteTourRating,
} = require("../controller/tourController");
const { userAuth, isAdmin } = require("../middlewares/authmiddleware");
const router = express.Router();

router.post("/create-tour", createTour);
router.get("/find-tours", searchTours);
router.get("/findone-tour", findTourById);
router.put("/update-tour/:id", updateTourById);
router.put("/rate-tour/:tourId", userAuth, tourRating);
router.put("/deletetour-rating/:tourId", userAuth, deleteTourRating);
router.delete("/delete-tour/:id", deleteTourById);

module.exports = router;
