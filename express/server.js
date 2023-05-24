const express = require("express");
const fs = require("fs");
const PORT = 3030;

const app = express();

app.get("/", (req, res) => {
  res.status(200).json({
    message: "welcome to my new service",
  });
});

const readDatabase = () => {
  const database = fs.readFileSync("./user.json");

  return JSON.parse(database);
};

const writeDatabase = (data) => {
  fs.writeFileSync("./user.json", JSON.stringify(data, null, 2));
};

// getting all users in database
app.get("/users", (req, res) => {
  const users = readDatabase().users;
  if (users.length === 0) {
    res.status(404).json({
      message: "empty",
    });
  } else {
    res.status(200).json({
      message: "ok",
      data: users,
      total: users.length,
    });
  }
});

app.get("/user/:id", (req, res) => {
  const users = readDatabase().users;
  const userId = parseInt(req.params.id);
  const user = users.find((item) => item.id === userId);
  if (!user) {
    res.status(404).json({
      message: "user not found",
    });
  } else {
    res.status(200).json({
      status: "success",
      data: user,
    });
  }
});

app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});
