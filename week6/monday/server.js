const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config/config.env" });

const app = require("./app");

const DB = process.env.DATABASEURL;

mongoose
  .connect(DB)
  .then(() => {
    console.log("connected to db");
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("running on port" + process.env.PORT);
    });
  });
