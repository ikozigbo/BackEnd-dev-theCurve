require("./config/dbConfig");
const express = require("express");
const session = require("express-session");
const userRouter = require("./routes/userRoutes");
const MongodbSession = require("connect-mongodb-session")(session);
const app = express();

//require("dotenv").config;
const PORT = process.env.PORT || 5050;

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

app.get("/", (req, res) => {
  req.session.isAuth = true;
  console.log(req.sessionID);
  console.log(req.session);
  res.send("hello");
});
//app.use(express.urlencoded({ extended: true }));
//app.use("/uploads", express.static(__dirname + "/uploads"));

app.use("/api", userRouter);

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
