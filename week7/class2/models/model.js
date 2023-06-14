const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true] },
    stack: { type: String, required: [true] },
    age: { type: Number, required: [true] },
    profilePicture: { type: String, required: [true] },
  },
  { timestamps: true }
);

const profileModel = mongoose.model("Profile", profileSchema);

module.exports = profileModel;
