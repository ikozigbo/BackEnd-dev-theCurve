const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema(
  {
    maths: {
      type: String,
      required: [true, "score required"],
    },
    english: {
      type: String,
      required: [true, "score required"],
    },
  },
  { timestamps: true }
);

const recordModel = mongoose.model("Record", recordSchema);

module.exports = recordModel;
