const Record = require("../models/recordModel");

const createRecord = async (req, res) => {
  try {
    const { math, english, userid } = req.body;
    const alreadyExistsUserRecord = await Record.findOne({ userid: userid });
    if (!alreadyExistsUserRecord) {
      const record = new Record({
        math,
        english,
      });
      const savedRecords = await record.save();
      res.status(201).json({
        data: savedRecords,
      });
    } else {
      res.status(401).json({
        message: "You have already created a record for this user",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getRecords = async (req, res) => {
  try {
    const records = await Record.find();
    res.status(201).json({
      data: records,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const record = await Record.findById(id);
    res.status(201).json({
      data: record,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const { math, english } = req.body;
    const data = {
      math,
      english,
    };
    const updatedrecord = await recordModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    res.status(201).json({
      data: updatedrecord,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const deleterecord = await recordModel.findByIdAndDelete(id);
    res.status(201).json({
      message: "Record deleted successfully",
      data: deleterecord,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createRecord,
  getRecords,
  getRecord,
  updateRecord,
  deleteRecord,
};
