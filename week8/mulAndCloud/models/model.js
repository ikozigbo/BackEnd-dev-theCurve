const mongoose = require("mongoose");

const personSchema = new mongoose.Schema(
  {
    personName: { type: String, required: true },
    personPhone: { type: String, required: true },
    personProfile: { type: String, required: true },
  },
  { timestamps: true }
);

const personModel = mongoose.model("Person", personSchema);

module.exports = personModel;
