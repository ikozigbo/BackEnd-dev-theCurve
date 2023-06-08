require("./config/dbConfig");
const express = require("express");
const carRouter = require("./routes/carRoutes");

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use("/api", carRouter);

app.listen(process.env.PORT, () => {
  console.log(`connected to port ${process.env.PORT}`);
});
