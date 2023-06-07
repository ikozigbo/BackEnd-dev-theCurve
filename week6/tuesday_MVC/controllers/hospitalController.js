const hospitalModel = require("../models/hospitalModel");

// create new patient
const newPatient = async (req, res) => {
  try {
    const patient = await hospitalModel.create(req.body);
    if (!patient) {
      res.status(400).json({
        messaage: "error",
      });
    } else {
      res.status(200).json({
        messaage: "new patient created",
        data: patient,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//get one
const getOnePatient = async (req, res) => {
  try {
    const patientID = req.params.id;
    const patient = await hospitalModel.findById(patientID);
    if (!patient) {
      res.status(400).json({
        messaage: "error",
      });
    } else {
      res.status(200).json({
        messaage: " patient ",
        data: patient,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//get all
const getAllPatients = async (req, res) => {
  try {
    const patients = await hospitalModel.find();
    if (!patients) {
      res.status(400).json({
        messaage: "error",
      });
    } else {
      res.status(200).json({
        messaage: "all patients",
        data: patients,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//update
const updatePatient = async (req, res) => {
  try {
    const patientId = req.params.id;
    const patient = await hospitalModel.findByIdAndUpdate(patientId, req.body, {
      new: true,
      runValidators: true,
    });
    if (!patient) {
      res.status(400).json({
        messaage: "error",
      });
    } else {
      res.status(200).json({
        messaage: "updated patient",
        data: patient,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
//delete
const deletePatient = async (req, res) => {
  try {
    const patientId = req.params.id;
    const patient = await hospitalModel.findByIdAndDelete(patientId);
    if (!patient) {
      res.status(400).json({
        messaage: "error",
      });
    } else {
      res.status(200).json({
        messaage: "updated patient",
        data: patient,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  newPatient,
  getOnePatient,
  getAllPatients,
  updatePatient,
  deletePatient,
};
