const CarRental = require("../model/carRentalModel");
const cloudinary = require("../utilities/cloudinary");

const createCarRental = async (req, res) => {
  try {
    const {
      brand,
      location,
      model,
      type,
      registrationNumber,
      maxPassengers,
      pricePerDay,
    } = req.body;
    let image_url = "https://images.app.goo.gl/WsNkZWiXBEJM4pCw5";
    // console.log(req.files);
    if (req.files?.image.tempFilePath) {
      const result = await cloudinary.uploader.upload(
        req.files.image.tempFilePath
      );
      image_url = result.secure_url;
    }
    const newcarRental = await CarRental.create({
      brand,
      location,
      model,
      type,
      registrationNumber,
      maxPassengers,
      pricePerDay,
      image: image_url,
    });
    res.status(200).json({
      success: true,
      newcarRental,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const findCarRentals = async (req, res) => {
  try {
    //console.log(req.query);
    const queryObj = { ...req.query };

    // Define an array of allowed fields
    const allowedFields = ["brand", "location", "model", "type"];

    // Loop through the queryObj and delete any field that is not in the allowedFields array
    for (const key in queryObj) {
      if (!allowedFields.includes(key)) {
        delete queryObj[key];
      }
    }

    const carRentals = await CarRental.find(queryObj);
    if (carRentals.length == 0) {
      res.status(404).json({
        message: "No car rentals found",
      });
    } else {
      res.status(200).json({
        success: true,
        carRentals,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const findOneCarRental = async (req, res) => {
  try {
    const { carRentalId } = req.params;
    const carRental = await CarRental.findById(carRentalId);
    if (!carRental) {
      res.status(404).json({
        message: "no car rental found",
      });
    } else {
      res.status(200).json({
        success: true,
        carRental,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteCarRental = async (req, res) => {
  try {
    const { carRentalId } = req.params;
    const carRental = await CarRental.findById(carRentalId);
    //delete all the photos from Cloudinary before deleting the hotel record in DB
    if (
      carRental.airlineLogo !== "https://images.app.goo.gl/WsNkZWiXBEJM4pCw5"
    ) {
      publicId = carRental.image.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(publicId);
    }
    await CarRental.findByIdAndDelete(carRentalId);
    res.status(200).json({
      message: "carRental deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createCarRental,
  findCarRentals,
  findOneCarRental,
  deleteCarRental,
};
