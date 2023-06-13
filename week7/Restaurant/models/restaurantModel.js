const mongoose = require("mongoose");

const restSchema = new mongoose.Schema(
  {
    branch: {
      type: String,
      required: [true, "please fill your branch"],
      unique: true,
    },
    citizenMeal: {
      type: Object,
    },
    refuelMax: {
      type: Object,
    },
    refuel: {
      type: Object,
    },
    chickWizz: {
      type: Object,
    },
    bigBoyzMeal: {
      type: Object,
    },
  },
  { timestamps: true }
);

const restaurantModel = mongoose.model("restaurant", restSchema);

module.exports = restaurantModel;
