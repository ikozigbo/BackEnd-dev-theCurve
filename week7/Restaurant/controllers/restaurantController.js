const restaurantModel = require("../models/restaurantModel");

// create new restaurant
const newResturant = async (req, res) => {
  try {
    const restaurant = await restaurantModel.create(req.body);
    if (!restaurant) {
      res.status(400).json({
        messaage: "error",
      });
    } else {
      res.status(200).json({
        messaage: "new restaurant created",
        data: restaurant,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//get all
const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await restaurantModel.find();
    if (!restaurants) {
      res.status(400).json({
        messaage: "error",
      });
    } else {
      res.status(200).json({
        messaage: "restaurants",
        data: restaurants,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//get one by branch
const getOneByBranch = async (req, res) => {
  try {
    const branch = req.params.branch;
    const restaurant = await restaurantModel.findOne({ branch });
    if (!restaurant) {
      res.status(400).json({
        messaage: "error",
      });
    } else {
      res.status(200).json({
        messaage: "branch found",
        data: restaurant,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//update  product
const updateMenu = async (req, res) => {
  try {
    
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  newResturant,
  getOneByBranch,
  getAllRestaurants,
};
