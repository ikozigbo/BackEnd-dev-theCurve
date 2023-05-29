const express = require("express");
const mongoose = require("mongoose");
PORT = 4090;

const app = express();
app.use(express.json());

//create database url
const databaseUrl = "mongodb://127.0.0.1/contactDB";

//create database connection
mongoose
  .connect(databaseUrl)
  .then(() => {
    console.log("Database connected");
  })
  .catch((e) => {
    console.log(e).message;
  });

// create schema for  contact book

const contactSchema = mongoose.Schema({
  firstname: { type: String, required: [true, "first name is required"] },
  lastname: { type: String, required: [true, "last name is required"] },
  Contactaddress: {
    housenumber: { type: String, required: [true, "house number is required"] },
    street: { type: String, required: [true, "street is required"] },
    city: { type: String, required: [true, "city is required"] },
    county: { type: String, required: [true, "country is required"] },
  },
  phoneNumber: {
    mobileNumber: {
      type: String,
      required: [true, "mobile number is required"],
    },
    workNumber: {
      type: String,
      default: function () {
        return this.phoneNumber.mobileNumber;
      },
    },
  },
});

//create model for contact
const contactModel = mongoose.model("contact book", contactSchema);

//creating a new contact
app.post("/contact", async (req, res) => {
  try {
    const contact = await contactModel.create(req.body);
    if (!contact) {
      res.status(400).json({
        message: "error creating task",
      });
    } else {
      res.status(201).json({
        message: "contact created",
        data: contact,
      });
    }
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
});

// getting all contacts
app.get("/contact", async (req, res) => {
  try {
    const contacts = await contactModel.find();
    if (!contacts) {
      res.status(404).json({
        message: "contacts database not found",
      });
    } else if (contacts.length == 0) {
      res.status(200).json({
        message: "no contacts on the database",
      });
    } else {
      res.status(200).json({
        message: "successful",
        data: contacts,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//getting contact based on ID
app.get("/contact/:id", async (req, res) => {
  try {
    const conatactId = req.params.id;
    const contact = await contactModel.findById(conatactId);
    if (!contact) {
      res.status(404).json({
        message: "contact not found",
      });
    } else {
      res.status(200).json({
        message: "successful",
        data: contact,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//updating contact based on ID
app.put("/contact/:id", async (req, res) => {
  try {
    const contactId = req.params.id;
    const updatedContact = await contactModel.findByIdAndUpdate(
      contactId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedContact) {
      res.status(404).json({
        message: "task not found",
      });
    } else {
      res.status(200).json({
        message: "contact updated",
        data: updatedContact,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//deleting contact
app.delete("/contact/:id", async (req, res) => {
  try {
    const contactId = req.params.id;
    const deletedContact = await contactModel.findByIdAndDelete(contactId);
    if (!deletedContact) {
      res.status(404).json({
        message: "contact not found",
      });
    } else {
      res.status(200).json({
        message: "contact deleted",
        data: deletedContact,
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
