require("./config/dbConfig");
const express = require("express");
const router = require("./routers/userRouter");
//require("dotenv").config;
const PORT = process.env.PORT || 5050;

const app = express();
app.use(express.json());
//app.use(express.urlencoded({ extended: true }));
//app.use("/uploads", express.static(__dirname + "/uploads"));

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
