const express = require("express");
const mongoose = require("mongoose");
PORT = 8090;

const app = express();
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1/electionDB")
  .then(() => {
    console.log("connected to db");
  })
  .catch((e) => {
    console.log(e.message);
  });

const electionSchema = mongoose.Schema({
  state: { type: String, required: [true, "state required"], unique: true },
  parties: { type: Array },
  result: {
    PDP: { type: Number, required: [true, "result required"] },
    APC: { type: Number, required: [true, "result required"] },
    LP: { type: Number, required: [true, "result required"] },
    APGA: { type: Number, required: [true, "result required"] },
  },
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
      let maxValue = -Infinity;
      for (const [key, value] of Object.entries(this.result)) {
        if (value > maxValue) {
          maxValue = value;
          maxKey = key;
        }
      }
      if (this.isRigged == false) {
        return `${maxKey} with ${maxValue} votes`;
      } else {
        return "no party because the election was rigged";
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

//get all results
app.get("/result", async (req, res) => {
  try {
    const results = await electionModel.find();
    if (!results) {
      res.status(404).json({
        message: "results not found",
      });
    } else if (results.length == 0) {
      res.status(200).json({
        message: "no result in the database",
      });
    } else {
      res.status(200).json({
        message: "successful",
        data: results,
      });
    }
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
});

//getting 1 result with id
app.get("/result/:id", async (req, res) => {
  try {
    const resultId = req.params.id;
    const result = await electionModel.findById(resultId);
    if (!result) {
      res.status(404).json({
        message: "result not found",
      });
    } else {
      res.status(200).json({
        message: "successful",
        data: result,
      });
    }
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
});
// updating result
app.put("/result/:id", async (req, res) => {
  try {
    const resultId = req.params.id;
    const updatedResult = await electionModel.findByIdAndUpdate(
      resultId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedResult) {
      res.status(404).json({
        message: "no updated result",
      });
    } else {
      res.status(200).json({
        message: "successful",
        data: updatedResult,
      });
    }
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
});

// gettin when election is rigged

app.get("/rigged", async (req, res) => {
  try {
    const rigged = await electionModel.find({ isRigged: true });
    res.status(200).json({
      message: "the followng elections where rigged",
      data: rigged,
    });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
});

// to check for winner
app.get("/winner/:state", async (req, res) => {
  try {
    const state = await electionModel.find({ state: req.params.state });
    const Winner = state[0].winner;

    res.status(200).json({
      message: `the winner of ${req.params.state} state election is ${Winner}`,
      statue: `Rigged: ${state[0].isRigged}`,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//to check for double collation officer
app.get("/collation/:collattion", async (req, res) => {
  try {
    const officerResults = await electionModel.find({
      collationOfficer: req.params.collattion,
    });
    if (officerResults.length < 1) {
      res.status(200).json({
        message: "this is not a registered collation officer",
      });
    } else if (officerResults.length > 1) {
      res.status(200).json({
        message: "this officer handled multiple election results",
        data: officerResults,
      });
    } else {
      res.status(200).json({
        message: "this officer handled only 1 result",
        data: officerResults,
      });
    }
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
});

// to delete rigged election
app.delete("/rigged", async (req, res) => {
  try {
    const rigged = await electionModel.find({ isRigged: true });
    const deleteRigged = await electionModel.deleteMany({ isRigged: true });
    res.status(200).json({
      message: "the following elections are inconclusive",
      data: rigged,
      deleteMessage: deleteRigged,
    });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
});

// deleting result
app.delete("/result/:id", async (req, res) => {
  try {
    const resultId = req.params.id;
    const deletedResult = electionModel.findByIdAndDelete(resultId);
    if (!deletedResult) {
      res.status(404).json({
        message: "no result found",
      });
    } else {
      res.status(200).json({
        message: "successfully deleted",
        data: deletedResult,
      });
    }
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
});

//function to iterate through an array of objects and add values with similar key names
function sumResults(arr) {
  const result = {};

  for (let obj of arr) {
    for (let key in obj) {
      if (typeof obj[key] === "number") {
        if (result[key]) {
          result[key] += obj[key];
        } else {
          result[key] = obj[key];
        }
      }
    }
  }

  return result;
}

//function to get the highest value of an object
function getWinner(obj) {
  let maxKey = null;
  let maxValue = -Infinity;
  for (const [key, value] of Object.entries(obj)) {
    if (value > maxValue) {
      maxValue = value;
      maxKey = key;
    }
  }
  return `The winner of the election is ${maxKey} with ${maxValue} votes`;
}

//to get overallwinner
app.get("/overall", async (req, res) => {
  try {
    const allValid = await electionModel.find({ isRigged: false });
    const invalid = await electionModel.find({ isRigged: true });
    let arrayy = [];
    allValid.forEach((element) => {
      arrayy.push(element.result);
    });

    let result = sumResults(arrayy);
    let winner = getWinner(result);

    res.status(200).json({
      electionResult: result,
      electionWinner: winner,
      statesWithValidVotes: allValid.length,
      statesWithInvalideVotes: invalid.length,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log("server is on ", PORT);
});

// let test = {
//   hhh: "cncn",
//   kfi: "kkfk",
//   kddhs: "kfjjs",
//   jfjdj: "kkdhd",
// };

// function testh(obj) {
//   for (let key in obj) {
//     console.log(obj[key]);
//   }
// }

// testh(test);

// function test(arr) {
//   result = {};
//   for (let obj of arr) {
//     for (let key in obj) {
//       if (typeof obj[key] === "number") {
//         if (!result[key]) {
//           result[key] = obj[key];
//         } else {
//           result[key] += obj[key];
//         }
//       }
//     }
//   }
//   return result
// }
