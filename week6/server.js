const express = require("express");
const mongoose = require("mongoose");
PORT = 8090;

const app = express();
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://ikozigbo:dVTsf6VNoXp6uZGX@cluster0.y52blbj.mongodb.net/"
  )
  .then(() => {
    console.log("connected to db");
  })
  .catch((e) => {
    console.log(e.message);
  });

const electionSchema = mongoose.Schema({
  state: { type: String, required: [true, "state required"], unique: true },
  parties: { type: Array },
  result: Object,
  // collationOfficer: {
  //   type: String,
  //   required: [true, "collation officer's name required"],
  // },
  totalLG: Number,
  totalRegisteredVoters: {
    type: Number,
    required: [
      true,
      "Enter the total number of registerd voters in this state",
    ],
  },
  isRigged: {
    type: Boolean,
    default: function () {
      let totalVoters = 0;
      for (const [key, value] of Object.entries(this.result)) {
        totalVoters += value;
      }
      if (totalVoters > this.totalRegisteredVoters) {
        return true;
      } else {
        return false;
      }
    },
  },
  totalVoters: {
    type: Number,
    default: function () {
      let totalVoters = 0;
      for (const [key, value] of Object.entries(this.result)) {
        totalVoters += value;
      }
      return totalVoters;
    },
  },
  winner: {
    type: String,
    default: function () {
      let maxKey = null;
      let maxValue = 0;
      for (const [key, value] of Object.entries(this.result)) {
        if (value > maxValue && this.isRigged == false) {
          maxValue = value;
          maxKey = key;
          return maxKey;
        } else {
          return "This election was rigged, no winner declared";
        }
      }
    },
    required: false,
  },
});

const electionModel = mongoose.model("Elections", electionSchema);

//create new entry
app.post("/create", async (req, res) => {
  try {
    const newEntry = await electionModel.create(req.body);
    res.status(200).json({
      message: "new entry successfullly added",
      data: newEntry,
    });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
});
app.listen(PORT, () => {
  console.log("server is on ", PORT);
});
