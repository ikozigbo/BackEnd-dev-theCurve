const mongoose = require("mongoose");

const familySchema = new mongoose.Schema(
  {
    fatherName: { type: String, required: [true, "please enter name"] },
    motherName: { type: String, required: [true, "please enter name"] },
    children: { type: Array },
    childrenImages: { type: Array },
  },
  { timestamps: true }
);

const familyModel = mongoose.model("Family", familySchema);

module.exports = familyModel;
