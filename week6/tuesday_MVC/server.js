require("./config/dbConfig");
const express = require("express");
const hospitalRouter = require("./routes/hospitalRoutes");
//require("dotenv").config;
const PORT = process.env.PORT || 5050;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", hospitalRouter);

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
