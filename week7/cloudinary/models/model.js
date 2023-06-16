const mongoose = require("mongoose");

const conatactSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "please enter name"] },
    email: { type: String, required: [true, "please enter email"] },
    message: { type: String },
    profilePicture: {
      cloud_id: { type: String },
      cloud_url: { type: String },
    },
  },
  { timestamps: true }
);

const contactModel = mongoose.model("cloudcontact", conatactSchema);

module.exports = contactModel;
