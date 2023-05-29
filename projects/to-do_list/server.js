const express = require("express");
const mongoose = require("mongoose");
PORT = 5090;

const app = express();
app.use(express.json());

//create database url
const databaseUrl = "mongodb://127.0.0.1/todoDB";

//create database connection
mongoose
  .connect(databaseUrl)
  .then(() => {
    console.log("Database connected");
  })
  .catch((e) => {
    console.log(e).message;
  });

// create schema for todo list
const todoSchema = mongoose.Schema({
  title: { type: String, required: [true, "title is required"] },
  completed: { type: Boolean, default: false },
});

// todo model
const todoModel = mongoose.model("todo list", todoSchema);

// created a new task
app.post("/todo", async (req, res) => {
  try {
    const task = await todoModel.create(req.body);
    if (!task) {
      res.status(400).json({
        message: "error creating task",
      });
    } else {
      res.status(201).json({
        message: "task created",
        data: task,
      });
    }
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
});

// getting all tasks
app.get("/todo", async (req, res) => {
  try {
    const tasks = await todoModel.find();
    if (!tasks) {
      res.status(404).json({
        message: "task database not found",
      });
    } else if (tasks.length == 0) {
      res.status(200).json({
        message: "no tasks on the database",
      });
    } else {
      res.status(200).json({
        message: "successful",
        data: tasks,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//getting task based on ID
app.get("/todo/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await todoModel.findById(taskId);
    if (!task) {
      res.status(404).json({
        message: "task not found",
      });
    } else {
      res.status(200).json({
        message: "successful",
        data: task,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//updating task based on ID
app.put("/todo/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const updatedTask = await todoModel.findByIdAndUpdate(taskId, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedTask) {
      res.status(404).json({
        message: "task not found",
      });
    } else {
      res.status(200).json({
        message: "task updated",
        data: updatedTask,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//deleting task
app.delete("/todo/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const deletedTask = await todoModel.findByIdAndDelete(taskId);
    if (!deletedTask) {
      res.status(404).json({
        message: "task not found",
      });
    } else {
      res.status(200).json({
        message: "task deleted",
        data: deletedTask,
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
