const express = require("express");
const mongoose = require("mongoose");
PORT = 5090;

const app = express();
app.use(express.json());

//create database url
const databaseUrl = "mongodb://127.0.0.1/blogDB";

//create database connection
mongoose
  .connect(databaseUrl)
  .then(() => {
    console.log("Database connected");
  })
  .catch((e) => {
    console.log(e.message);
  });

// create schema for blog
const blogSchema = mongoose.Schema({
  title: { type: String, required: [true, "title is required"] },
  author: { type: String, required: [true, "author is required"] },
  content: { type: String, required: [true, "content is required"] },
  dateCreated: {
    type: Date,
    default: function () {
      const date = new Date();
      return date;
    },
  },
});

// blog model
const blogModel = mongoose.model("blogs", blogSchema);

// created a blog
app.post("/blog", async (req, res) => {
  try {
    const blog = await blogModel.create(req.body);
    if (!blog) {
      res.status(400).json({
        message: "error posting blog",
      });
    } else {
      res.status(201).json({
        message: "blog created",
        data: blog,
      });
    }
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
});

// getting all blogs
app.get("/blog", async (req, res) => {
  try {
    const blogs = await blogModel.find();
    if (!blogs) {
      res.status(404).json({
        message: "blog database not found",
      });
    } else if (blogs.length == 0) {
      res.status(200).json({
        message: "no blogs on the database",
      });
    } else {
      res.status(200).json({
        message: "successful",
        data: blogs,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//getting blog based on ID
app.get("/blog/:id", async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await blogModel.findById(blogId);
    if (!blog) {
      res.status(404).json({
        message: "task not found",
      });
    } else {
      res.status(200).json({
        message: "successful",
        data: blog,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//updating blog based on ID
app.put("/blog/:id", async (req, res) => {
  try {
    const blogId = req.params.id;
    const updatedBlog = await blogModel.findByIdAndUpdate(blogId, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedBlog) {
      res.status(404).json({
        message: "blog not found",
      });
    } else {
      res.status(200).json({
        message: "blog updated",
        data: updatedBlog,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//deleting blog
app.delete("/blog/:id", async (req, res) => {
  try {
    const blogId = req.params.id;
    const deletedBlog = await blogModel.findByIdAndDelete(blogId);
    if (!deletedBlog) {
      res.status(404).json({
        message: "blog not found",
      });
    } else {
      res.status(200).json({
        message: "blog deleted",
        data: deletedBlog,
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
