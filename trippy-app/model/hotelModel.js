const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema(
  {
    hotelName: {
      type: String,
      required: [true, "Hotel name is required."],
      lowercase: true,
    },
    city: {
      type: String,
      required: [true, "city is required."],
      lowercase: true,
    },
    country: {
      type: String,
      required: [true, "country is required."],
      lowercase: true,
    },
    address: {
      type: String,
      required: [true, "address is required."],
    },
    description: {
      type: String,
      required: [true, "Description is required."],
    },
    checkIn: {
      type: Number,
      required: [true, "Check in time is required."],
    },
    checkOut: {
      type: Number,
      required: [true, "Check out time is required."],
    },
    pricePerNight: {
      type: Number,
      required: [true, "Price is required."],
    },
    features: [String],
    images: [String],
    maxPerRoom: {
      type: Number,
      required: [true, "Max per room is required."],
    },
    starRating: {
      type: Number,
    },
    ratings: [
      {
        star: Number,
        comment: String,
        postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
    ],
  },
  { timestamps: true }
);

const hotelModel = mongoose.model("Hotel", hotelSchema);

module.exports = hotelModel;
