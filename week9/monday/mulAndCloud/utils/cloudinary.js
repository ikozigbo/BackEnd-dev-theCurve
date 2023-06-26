const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dg7xjfg2m",
  api_key: "596131721153757",
  api_secret: "6X2hCJmMVglWBEfHvvNMYyjPaTE",
});

module.exports = cloudinary;
