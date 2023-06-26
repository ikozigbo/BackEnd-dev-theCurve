const mongoose = require("mongoose");

const personSchema = new mongoose.Schema(
  {
    Name: { type: String, required: true },
    personNumber: { type: Number, required: true },
    profilePicture: { type: String, required: true },
  },
  { timestamps: true }
);

const personModel = mongoose.model("Person", personSchema);

module.exports = personModel;
