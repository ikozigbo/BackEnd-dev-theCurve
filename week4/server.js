const express = require("express");
const mongoose = require("mongoose");
PORT = 3060;

//create database url
const databaseUrl = "mongodb://127.0.0.1/studentDB";
//const databaseUrl = 'mongodb://localhost/studentDB'

//create database connection
mongoose
  .connect(databaseUrl)
  .then(() => {
    console.log("Database connected");
  })
  .catch((e) => {
    console.log(e).message;
  });

//create model
const studentSchema = mongoose.Schema({
  studentName: { type: String, required: [true, "student name is required"] },
  studentCourse: {
    type: String,
    required: [true, "student course is required"],
  },
  courseDuration: {
    type: Number,
    required: [true, "student duration is required"],
  },
});

// schema model
const studentModel = mongoose.model("students", studentSchema);

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "welcome",
  });
});

//create new student
app.post("/students", async (req, res) => {
  try {
    const student = await studentModel.create(req.body);
    if (!student) {
      res.status(400).json({
        message: "error creating student",
      });
    } else {
      res.status(201).json({
        message: "student created",
        data: student,
      });
    }
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
});

app.get("/students", async (req, res) => {
  try {
    const students = await studentModel.find();
    if (students.length < 0) {
      res.status(404).json({
        message: "no student found",
      });
    } else {
      res.status(200).json({
        status: "success",
        data: students,
        size: students.length,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

app.get("/students/:id", async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await studentModel.findById(studentId);
    if (!student) {
      res.status(404).json({
        message: "user not found",
      });
    } else {
      res.status(200).json({
        message: "success",
        data: student,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

app.put("/students/:id", async (req, res) => {
  try {
    const studentId = req.params.id;
    const updatedStudent = await studentModel.findByIdAndUpdate(
      studentId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedStudent) {
      res.status(404).json({
        message: "user not found",
      });
    } else {
      res.status(200).json({
        message: "user updated",
        data: updatedStudent,
      });
    }
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
});

app.delete("/students/:id", async (req, res) => {
  try {
    const studentId = req.params.id;
    const deletedStudent = await studentModel.findByIdAndDelete(studentId);
    if (!deletedStudent) {
      res.status(404).json({
        message: "user not found",
      });
    } else {
      res.status(200).json({
        message: "student deleted",
        data: deletedStudent,
      });
    }
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log("server is on ", PORT);
});
