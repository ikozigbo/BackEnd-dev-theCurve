const mongoose = require("mongoose");

const branchSchema = new mongoose.Schema(
  {
    branchName: {
      type: String,
      required: [true, "please fill branch"],
      unique: true,
    },
    branchAddress: {
      type: String,
      required: [true, "please fill address"],
    },
    citizenMeal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Menu",
      default: null,
    },
    refuelMax: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Menu",
      default: null,
    },
    refuel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Menu",
      default: null,
    },
    chickWizz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Menu",
      default: null,
    },
    bigBoyzMeal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Menu",
      default: null,
    },
  },
  { timestamps: true }
);

const branchModel = mongoose.model("Branch", branchSchema);

module.exports = branchModel;
