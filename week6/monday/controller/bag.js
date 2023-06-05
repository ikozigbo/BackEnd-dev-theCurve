const BagModel = require("../model/bag");

exports.newCollection = async (req, res) => {
  try {
    const newData = await BagModel.create(req.body);
    res.status(201).json({
      message: "success",
      data: newData,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

//get all
exports.viewAll = async (req, res) => {
  try {
    const allBags = await BagModel.find();
    res.status(200).json({
      message: "ok",
      data: allBags,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

//find and update
exports.updateInfo = async (req, res) => {
  try {
    const id = req.params.id;
    const updated = await BagModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      message: "updated",
      data: updated,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};
