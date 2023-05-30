const express = require("express");
const mongoose = require("mongoose");
PORT = 8090;

const app = express();
app.use(express.json());

//create database url
const databaseUrl = "mongodb://127.0.0.1/studentDB";

//create database connection
mongoose
  .connect(databaseUrl)
  .then(() => {
    console.log("Database connected");
  })
  .catch((e) => {
    console.log(e.message);
  });

// create schema for student
const studentSchema = mongoose.Schema({
  name: { type: String, required: [true, "name is required"] },
  course: { type: String, required: [true, "course is required"] },
  designation: { type: String, required: [true, "designation is required"] },
  score: {
    html: { type: Number, required: [true, "score is required"] },
    css: { type: Number, required: [true, "score is required"] },
    javascript: { type: Number, required: [true, "score is required"] },
    node: { type: Number, required: [true, "score is required"] },
  },
});

// student model
const studentModel = mongoose.model("students", studentSchema);

// registering new student
app.post("/student", async (req, res) => {
  try {
    const student = await studentModel.create(req.body);
    if (!student) {
      res.status(400).json({
        message: "error registering student",
      });
    } else {
      res.status(201).json({
        message: "New student registered",
        data: student,
      });
    }
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
});
// getting all students
app.get("/student", async (req, res) => {
  try {
    const students = await studentModel.find();
    if (!students) {
      res.status(404).json({
        message: "student database not found",
      });
    } else if (students.length == 0) {
      res.status(200).json({
        message: "no staff in the database",
      });
    } else {
      res.status(200).json({
        message: "successful",
        data: students,
        numberOfStudents: students.length,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//getting student with id
app.get("/student/:id", async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await studentModel.findById(studentId);
    if (!student) {
      res.status(404).json({
        message: "student not found",
      });
    } else {
      res.status(200).json({
        message: "successful",
        data: student,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//updating student based on ID
app.put("/student/:id", async (req, res) => {
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
        message: "student not found",
      });
    } else {
      res.status(200).json({
        message: "student updated",
        data: updatedStudent,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//deleting student
app.delete("/student/:id", async (req, res) => {
  try {
    const studentId = req.params.id;
    const deletedStudent = await studentModel.findByIdAndDelete(studentId);
    if (!deletedStudent) {
      res.status(404).json({
        message: "student not found",
      });
    } else {
      res.status(200).json({
        message: "student deleted",
        data: deletedStudent,
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
