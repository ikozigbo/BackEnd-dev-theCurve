const express = require("express");
const fs = require("fs");
const PORT = 3030;

const app = express();
app.use(express.json());

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

// create new user
app.post("/users", (req, res) => {
  const database = readDatabase();
  // const newUser = req.body;
  // newUser.id = database.users.length + 1;
  // database.users.push(newUser);
  // writeDatabase(database);
  // res.status(200).json({
  //   newData: newUser,
  // });
  const { name, age } = req.body;

  lastIndex = database.users.length - 1;
  newUserid = database.users[lastIndex].id + 1;
  newUser = {
    id: newUserid,
    name,
    age,
  };

  database.users.push(newUser);
  writeDatabase(database);
  res.status(201).json({
    newData: newUser,
  });
});

// update new user
app.put("/users/:id", (req, res) => {
  const database = readDatabase();
  const userId = parseInt(req.params.id);
  const updatedUser = req.body;
  const index = database.users.findIndex((i) => i.id === userId);
  if (index !== -1) {
    database.users[index] = { ...database.users[index], ...updatedUser };
    writeDatabase(database);
    res.status(200).json({
      data: database.users[index],
    });
  } else {
    res.send("wrong id sent");
  }
});

// delete user
app.delete("/users/:id", (req, res) => {
  const database = readDatabase();
  const userId = parseInt(req.params.id);
  const user = database.users.find((i) => i.id === userId);
  const index = database.users.findIndex((i) => i.id === userId);
  if (!user) {
    res.status(404).json({
      message: "User not found",
    });
  } else {
    database.users.splice(index, 1);
    writeDatabase(database);
    res.status(200).json({
      deleteData: user,
    });
  }
});

app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});
