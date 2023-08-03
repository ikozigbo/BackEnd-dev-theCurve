require("./config/dbConfig");
const express = require("express");
const fileupload = require("express-fileupload");
const userRouter = require("./routers/userRouter");
const adminRouter = require("./routers/adminRouter");
const hotelRouter = require("./routers/hotelRouter");
const tourRouter = require("./routers/tourRouter");
const PORT = process.env.PORT || 5050;

const app = express();

app.use(express.json());
app.use(
  fileupload({
    useTempFiles: true,
  })
);

app.use("/trippy", userRouter);
app.use("/trippy", adminRouter);
app.use("/trippy", hotelRouter);
app.use("/trippy", tourRouter);

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
