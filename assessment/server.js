const express = require("express");
const fs = require("fs");
const PORT = 3070;

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "welcome to my staff database",
  });
});

const database = {
  staff: [
    {
      id: 1,
      staffName: "ik",
      staffAddress: "no 17 a street",
      staffSalary: "$100,000",
      staffPosition: "intern",
      staffGender: "male",
    },
    {
      id: 2,
      staffName: "emma",
      staffAddress: "no 16 a street",
      staffSalary: "$10,000",
      staffPosition: "intern",
      staffGender: "male",
    },
    {
      id: 3,
      staffName: "dom",
      staffAddress: "no 15 a street",
      staffSalary: "$20,000",
      staffPosition: "intern",
      staffGender: "male",
    },
    {
      id: 4,
      staffName: "faith",
      staffAddress: "no 6 a street",
      staffSalary: "$10,000",
      staffPosition: "intern",
      staffGender: "female",
    },
    {
      id: 5,
      staffName: "ik",
      staffAddress: "no 17d a street",
      staffSalary: "$100,000",
      staffPosition: "intern",
      staffGender: "male",
    },
    {
      id: 6,
      staffName: "ik",
      staffAddress: "no 17d a street",
      staffSalary: "$100,000",
      staffPosition: "intern",
      staffGender: "male",
    },
  ],
};

// const readDatabase = () => {
//   const database = fs.readFileSync("./staff.json");

//   return JSON.parse(database);
// };

// const writeDatabase = (data) => {
//   fs.writeFileSync("./staff.json", JSON.stringify(data, null, 2));
// };

// getting all staff in database
app.get("/allstaff", (req, res) => {
  if (database.length === 0) {
    res.status(404).json({
      message: "empty",
    });
  } else {
    res.status(200).json({
      message: "ok",
      data: database,
      total: database.staff.length,
    });
  }
});

//getting 1 staff
app.get("/staff/:id", (req, res) => {
  const staffId = parseInt(req.params.id);
  const staff = database.staff.find((item) => item.id === staffId);
  if (!staff) {
    res.status(404).json({
      message: "user not found",
    });
  } else {
    res.status(200).json({
      status: "success",
      data: staff,
    });
  }
});

// create new staff
app.post("/staff", (req, res) => {
  const { staffName, staffAddress, staffSalary, staffPosition, staffGender } =
    req.body;

  lastIndex = database.staff.length - 1;
  newStaffid = database.staff[lastIndex].id + 1;
  newStaff = {
    id: newStaffid,
    staffName,
    staffAddress,
    staffSalary,
    staffPosition,
    staffGender,
  };

  database.staff.push(newStaff);
  res.status(201).json({
    newData: newStaff,
  });
});

// update staff
app.put("/staff/:id", (req, res) => {
  const staffId = parseInt(req.params.id);
  const updatedStaff = req.body;
  const index = database.staff.findIndex((i) => i.id === staffId);
  if (index !== -1) {
    database.staff[index] = { ...database.staff[index], ...updatedStaff };
    res.status(200).json({
      data: database.staff[index],
    });
  } else {
    res.send("wrong id sent");
  }
});

// delete staff
app.delete("/staff/:id", (req, res) => {
  const staffId = parseInt(req.params.id);
  const staff = database.staff.find((i) => i.id === staffId);
  const index = database.staff.findIndex((i) => i.id === staffId);
  if (!staff) {
    res.status(404).json({
      message: "User not found",
    });
  } else {
    database.staff.splice(index, 1);
    res.status(200).json({
      deleteData: staff,
    });
  }
});

app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});
