const mongoose = require("mongoose");

const hospitalSchema = mongoose.Schema(
  {
    name: String,
    address: String,
    medicalHistory: String,
    bloodGroup: String,
    gender: String,
    phone: String,
  },
  { timestamps: true }
);

const hospitalModel = mongoose.model("hospital", hospitalSchema);

module.exports = hospitalModel;
