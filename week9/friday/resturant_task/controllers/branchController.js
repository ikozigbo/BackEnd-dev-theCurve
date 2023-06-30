const Branch = require("../models/branchModel");

// create new branch
const newBranch = async (req, res) => {
  try {
    const branch = await Branch.create(req.body);
    if (!branch) {
      res.status(400).json({
        messaage: "error",
      });
    } else {
      res.status(200).json({
        messaage: "new branch created",
        data: branch,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//get one
const getOneBranch = async (req, res) => {
  try {
    const branchID = req.params.id;
    const branch = await Branch.findById(branchID)
      .populate("citizenMeal", ["main", "side", "drink"])
      .populate("refuelMax", ["main", "side", "drink"])
      .populate("refuel", ["main", "side", "drink"])
      .populate("chickWizz", ["main", "side", "drink"])
      .populate("bigBoyzMeal", ["main", "side", "drink"]);
    if (!branch) {
      res.status(400).json({
        messaage: "error",
      });
    } else {
      res.status(200).json({
        messaage: "branch ",
        data: branch,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//get all
const getAllBranches = async (req, res) => {
  try {
    const branches = await Branch.find()
      .populate("citizenMeal")
      .populate("refuelMax")
      .populate("refuel")
      .populate("chickWizz")
      .populate("bigBoyzMeal");
    if (!branches) {
      res.status(400).json({
        messaage: "error",
      });
    } else {
      res.status(200).json({
        messaage: "all patients",
        data: branches,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//update
const updateBranch = async (req, res) => {
  try {
    const branchId = req.params.id;
    const { branchName, branchAddress } = req.body;
    const branch = await hospitalModel.findByIdAndUpdate(
      branchId,
      { branchName, branchAddress },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!branch) {
      res.status(400).json({
        messaage: "error",
      });
    } else {
      res.status(200).json({
        messaage: "updated branch",
        data: branch,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
//delete
const deleteBranch = async (req, res) => {
  try {
    const branchId = req.params.id;
    const branch = await hospitalModel.findByIdAndDelete(branchId);
    if (!branch) {
      res.status(400).json({
        messaage: "error",
      });
    } else {
      res.status(200).json({
        messaage: "deleted branch",
        data: branch,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  newBranch,
  getAllBranches,
  getOneBranch,
  updateBranch,
  deleteBranch,
};
