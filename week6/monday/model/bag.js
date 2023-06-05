const mongoose = require("mongoose");

const BagSchema = new mongoose.Schema({
  brandName: String,
  color: String,
  price: Number,
});
const BagModel = mongoose.model("Bag", BagSchema);
module.exports = BagModel;
