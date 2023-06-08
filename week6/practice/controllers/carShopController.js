const carShopModel = require("../models/carShopModel");

//register new car
const newCar = async (req, res) => {
  try {
    const car = carShopModel.create(req.body);
    res.status(200).json({
      message: "created",
      data: car,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  newCar,
};
