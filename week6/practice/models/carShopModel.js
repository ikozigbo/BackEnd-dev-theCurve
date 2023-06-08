const mongoose = require("mongoose");

const carShopSchema = mongoose.Schema({
  carBrand: String,
  carModel: String,
  carColor: String,
  brandNew: Boolean,
});

const carShopModel = mongoose.model("car", carShopSchema);

module.exports = carShopModel;
