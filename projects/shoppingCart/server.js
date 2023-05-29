const express = require("express");
const mongoose = require("mongoose");
PORT = 3090;

const app = express();
app.use(express.json());

//create database url
const databaseUrl = "mongodb://127.0.0.1/shoppingDB";

//create database connection
mongoose
  .connect(databaseUrl)
  .then(() => {
    console.log("Database connected");
  })
  .catch((e) => {
    console.log(e).message;
  });

// create schema for cart
const cartSchema = mongoose.Schema({
  product: { type: String, required: [true, "product is required"] },
  unitPrice: { type: Number, required: [true, "unit price is required"] },
  quantity: { type: Number, required: [true, "quantity is required"] },
  price: {
    type: Number,
    default: function () {
      const price = this.quantity * this.unitPrice;
      return price;
    },
    required: false,
  },
});

// cart model
const cartModel = mongoose.model("shopping cart", cartSchema);

// created a new item
app.post("/cart", async (req, res) => {
  try {
    const { product, unitPrice, quantity } = req.body;
    const item = await cartModel.create({ product, unitPrice, quantity });
    if (!item) {
      res.status(400).json({
        message: "error adding item to cart",
      });
    } else {
      res.status(201).json({
        message: "item added",
        data: item,
      });
    }
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
});
// getting all items in cart
app.get("/cart", async (req, res) => {
  try {
    const cart = await cartModel.find();
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
    if (!cart) {
      res.status(404).json({
        message: "cart not found",
      });
    } else if (cart.length == 0) {
      res.status(200).json({
        message: "no items in cart",
      });
    } else {
      res.status(200).json({
        message: "successful",
        data: cart,
        totalPrice: totalPrice,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//getting item in cart
app.get("/cart/:id", async (req, res) => {
  try {
    const itemId = req.params.id;
    const item = await cartModel.findById(itemId);
    if (!item) {
      res.status(404).json({
        message: "task not found",
      });
    } else {
      res.status(200).json({
        message: "successful",
        data: item,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//updating item based on ID
app.put("/cart/:id", async (req, res) => {
  try {
    const itemId = req.params.id;

    const firstUpdate = await cartModel.findByIdAndUpdate(itemId, req.body, {
      new: true,
      runValidators: true,
    });
    // updating the price automatically, when the user updates the quantity or the unit price
    const updatedPrice = firstUpdate.quantity * firstUpdate.unitPrice;

    const updatedItem = await cartModel.findByIdAndUpdate(
      itemId,
      { price: updatedPrice },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedItem) {
      res.status(404).json({
        message: "item not found",
      });
    } else {
      res.status(200).json({
        message: "item updated",
        data: updatedItem,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//deleting task
app.delete("/cart/:id", async (req, res) => {
  try {
    const itemId = req.params.id;
    const deletedItem = await cartModel.findByIdAndDelete(itemId);
    if (!deletedItem) {
      res.status(404).json({
        message: "item not found",
      });
    } else {
      res.status(200).json({
        message: "item deleted",
        data: deletedItem,
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
