const express = require("express");
const mongoose = require("mongoose");
PORT = 8090;

const app = express();
app.use(express.json());

const electionSchema = mongoose.Schema({
  state: String,
  parties: Array,
  result: Object,
  collationOfficer: String,
  isRigged: Boolean,
  totalLG: Number,
});

const electionModel = mongoose.model("Elections", electionSchema);

app.post("/create", async (req, res) => {
  try {
    const newEntry = await electionModel.create(req.body);
    res.status(200).json({
      message: "new entry successfullly added",
      data: newEntry,
    });
  } catch (error) {}
});

app.listen(PORT, () => {
  console.log("server is on ", PORT);
});

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
