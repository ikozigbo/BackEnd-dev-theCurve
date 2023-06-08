const mongoose = require("mongoose");
require("dotenv").config();

const url = process.env.DB;

mongoose
  .connect(url)
  .then(() => {
    console.log(`connected to ${url}`);
  })
  .catch((e) => {
    console.log(e.message);
  });
