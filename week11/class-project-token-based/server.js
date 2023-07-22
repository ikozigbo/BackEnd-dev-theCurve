require("./config/dbConfig");
const express = require("express");
const userRouter = require("./routers/userRouter");
const recordRouter = require("./routers/recordRouter");

const PORT = process.env.PORT || 5050;

const app = express();
app.use(express.json());

app.use("/api", userRouter);
app.use("/api", recordRouter);

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
