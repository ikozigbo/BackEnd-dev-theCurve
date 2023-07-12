require("./config/dbConfig");
const express = require("express");
const router = require("./routers/userRouter");
const session = require("express-session");
const MongodbSession = require("connect-mongodb-session")(session);

//require("dotenv").config;
const PORT = process.env.PORT || 5050;

const app = express();
app.use(express.json());
//app.use(express.urlencoded({ extended: true }));
//app.use("/uploads", express.static(__dirname + "/uploads"));

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

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
