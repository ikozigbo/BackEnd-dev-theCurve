const express = require("express");
const mongoose = require("mongoose");
PORT = 9090;

const app = express();
app.use(express.json());

//create database url
const databaseUrl = "mongodb://127.0.0.1/employeeDB";

//create database connection
mongoose
  .connect(databaseUrl)
  .then(() => {
    console.log("Database connected");
  })
  .catch((e) => {
    console.log(e.message);
  });

// create schema for employee
const employeeSchema = mongoose.Schema({
  name: { type: String, required: [true, "staffName is required"] },
  address: {
    type: String,
    required: [true, "staffAddress price is required"],
  },
  salary: { type: String, required: [true, "staffSalary is required"] },
  position: {
    type: String,
    required: [true, "staffPosition is required"],
  },
  gender: { type: String, required: [true, "staffGender is required"] },
});

// employee model
const employeeModel = mongoose.model("employees", employeeSchema);

// registering new staff
app.post("/staff", async (req, res) => {
  try {
    const staff = await employeeModel.create(req.body);
    if (!staff) {
      res.status(400).json({
        message: "error registering staff",
      });
    } else {
      res.status(201).json({
        message: "New staff registered",
        data: staff,
      });
    }
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
});
// getting all staff
app.get("/staff", async (req, res) => {
  try {
    const staffs = await employeeModel.find();
    if (!staffs) {
      res.status(404).json({
        message: "employee database not found",
      });
    } else if (staffs.length == 0) {
      res.status(200).json({
        message: "no staff in the database",
      });
    } else {
      res.status(200).json({
        message: "successful",
        data: staffs,
        numberOfStaff: staffs.length,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//getting staff with id
app.get("/staff/:id", async (req, res) => {
  try {
    const staffId = req.params.id;
    const staff = await employeeModel.findById(staffId);
    if (!staff) {
      res.status(404).json({
        message: "employee not found",
      });
    } else {
      res.status(200).json({
        message: "successful",
        data: staff,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//updating staff based on ID
app.put("/staff/:id", async (req, res) => {
  try {
    const staffId = req.params.id;
    const updatedStaff = await employeeModel.findByIdAndUpdate(
      staffId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedStaff) {
      res.status(404).json({
        message: "staff not found",
      });
    } else {
      res.status(200).json({
        message: "staff updated",
        data: updatedStaff,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//deleting staff
app.delete("/staff/:id", async (req, res) => {
  try {
    const staffId = req.params.id;
    const deletedStaff = await employeeModel.findByIdAndDelete(staffId);
    if (!deletedStaff) {
      res.status(404).json({
        message: "staff not found",
      });
    } else {
      res.status(200).json({
        message: "staff deleted",
        data: deletedStaff,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log("server is on ", PORT);
});
