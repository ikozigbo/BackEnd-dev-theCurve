require("./config/dbConfig");
const express = require("express");
const userRouter = require("./routers/userRouter");
const recordRouter = require("./routers/recordRouter");
const session = require("express-session");
const MongodbSession = require("connect-mongodb-session")(session);

const PORT = process.env.PORT || 5050;

const app = express();
app.use(express.json());

const store = new MongodbSession({
  uri: process.env.DB,
  collection: "my sessions",
});

app.use(
  session({
    secret: "thisWillSignTheCookie",
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use("/api", userRouter);
app.use("/api", recordRouter);

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
