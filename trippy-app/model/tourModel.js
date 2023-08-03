const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema(
  {
    tourName: {
      type: String,
      required: [true, "tour name is required."],
    },
    city: {
      type: String,
      required: [true, "city is required."],
    },
    country: {
      type: String,
      required: [true, "country is required."],
    },
    info: {
      type: String,
      required: [true, "info is required."],
    },
    amenities: [String],
    images: [String],
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

const tourModel = mongoose.model("Tour", tourSchema);

module.exports = tourModel;
