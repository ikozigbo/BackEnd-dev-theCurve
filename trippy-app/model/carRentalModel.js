const mongoose = require("mongoose");

const carRentalSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: [true, "Brand is required."],
      lowercase: true,
    },
    location: {
      type: String,
      required: [true, "location is required."],
      lowercase: true,
    },
    model: {
      type: String,
      required: [true, "Model is required."],
      lowercase: true,
    },
    type: {
      type: String,
      required: [true, "Vehicle Type is required."],
    },
    registrationNumber: {
      type: String,
      required: [true, "Registration Number is required."],
    },
    maxPassengers: {
      type: Number,
      required: [true, "max passengers is required."],
      lowercase: true,
    },
    pricePerDay: {
      type: Number,
      required: [true, "Price Per Day is required."],
      lowercase: true,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const carModel = mongoose.model("Car-Rental", carRentalSchema);

module.exports = carModel;
