const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema(
  {
    mealName: {
      type: String,
      required: [true, "please enter the meal name "],
    },
    branch: {
      branchName: {
        type: String,
        required: [true, "please enter the brach name "],
      },
      branchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Branch",
        required: true,
      },
    },
    main: {
      type: String,
      required: [true, "please enter the main avaliable"],
    },
    side: {
      type: String,
      required: [true, "please enter the side available"],
    },
    drink: {
      type: String,
      required: [true, "please enter the meal drink avaliable "],
    },
  },
  { timestamps: true }
);

const menuModel = mongoose.model("Menu", menuSchema);

module.exports = menuModel;
