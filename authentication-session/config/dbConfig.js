require("dotenv").config();
const mongoose = require("mongoose");

const url = process.env.DB;

mongoose
  .connect(url, {
    useNewUrlParser: true,

    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`successfully connected to ${url}`);
  })
  .catch((e) => {
    console.log(e.message);
  });
