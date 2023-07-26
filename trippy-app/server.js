require("./config/dbConfig");
const express = require("express");
const userRouter = require("./routers/userRouter");

const PORT = process.env.PORT || 5050;

const app = express();
app.use(express.json());

app.use("/trippy", userRouter);

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
