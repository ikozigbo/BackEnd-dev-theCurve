const Record = require("../model/records");

const createRecord = async (req, res) => {
  const { math, english } = req.body;
  try {
    const newRecord = await Record.create({
      math,
      english,
    });
    res.status(200).json(newRecord);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { createRecord };
