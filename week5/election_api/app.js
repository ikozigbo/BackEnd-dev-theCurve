const express = require("express");
const mongoose = require("mongoose");

const port = 9876;
const app = express();
app.use(express.json());

const ElectionSchema = mongoose.Schema(
  {
    state: { type: String, required: [true, "state must be filled"] },
    parties: { type: Array, required: [true, "fill political parties"] },
    result: { type: Object, required: [true, "result must be filled"] },
    totalVotes: { type: Number },
    totalOccupant: {
      type: Number,
      required: [true, "Total   Occupant must be filled"],
    },
    isRigged: {
      type: Boolean,
      default: () => {
        if (this.totalOccupant < this.totalVotes) {
          return true;
          console.log("true");
        } else {
          return false;
          console.log("false");
        }
      },
    },
  },
  { timeStamp: true }
);

const election = mongoose.model("State Election", ElectionSchema);

app.post("/create", async (req, res) => {
  try {
    const data = {
      state: req.body.state,
      parties: req.body.parties,
      result: req.body.result,
      totalOccupant: req.body.totalOccupant,
      totalVotes:
        req.body.result.apc +
        req.body.result.pdp +
        req.body.result.lp +
        req.body.result.apga,
    };

    const createdData = await election.create(data);

    res.status(200).json({ data: createdData });
  } catch (error) {
    res.status(404).json("Unable to create  data ");
  }
});

mongoose
  .connect("mongodb://127.0.0.1/electionDB")
  .then(() => {
    console.log("connected to db");
  })
  .catch((e) => {
    console.log(e.message);
  });

app.listen(port, () => {
  console.log("Server is up and running on" + port);
});
