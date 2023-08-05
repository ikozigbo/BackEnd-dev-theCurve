const Flight = require("../model/flightModel");
const cloudinary = require("../utilities/cloudinary");

const createFlight = async (req, res) => {
  try {
    const {
      from,
      to,
      depatureTime,
      arrivalTime,
      priceStandard,
      priceFlex,
      airlineName,
    } = req.body;
    let image_url = "https://images.app.goo.gl/WsNkZWiXBEJM4pCw5";
    // console.log(req.files);
    if (req.files?.airlineLogo.tempFilePath) {
      const result = await cloudinary.uploader.upload(
        req.files.airlineLogo.tempFilePath
      );
      image_url = result.secure_url;
    }
    const newFlight = await Flight.create({
      from,
      to,
      depatureTime,
      arrivalTime,
      priceStandard,
      priceFlex,
      airlineName,
      airlineLogo: image_url,
    });
    res.status(200).json({
      success: true,
      newFlight,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const findFlights = async (req, res) => {
  try {
    //console.log(req.query);
    const queryObj = { ...req.query };

    // Define an array of allowed fields
    const allowedFields = ["from", "to"];

    // Loop through the queryObj and delete any field that is not in the allowedFields array
    for (const key in queryObj) {
      if (!allowedFields.includes(key)) {
        delete queryObj[key];
      }
    }

    const flights = await Flight.find(queryObj);
    if (flights.length == 0) {
      res.status(404).json({
        message: "No flights flying that route",
      });
    } else {
      res.status(200).json({
        success: true,
        flights,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const findOneFlight = async (req, res) => {
  try {
    const { flightId } = req.params;
    const flight = await Flight.findById(flightId);
    if (!flight) {
      res.status(404).json({
        message: "no flight found",
      });
    } else {
      res.status(200).json({
        success: true,
        flight,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteFlight = async (req, res) => {
  try {
    const { flightId } = req.params;
    const flight = await Flight.findById(flightId);
    //delete all the photos from Cloudinary before deleting the hotel record in DB
    if (flight.airlineLogo !== "https://images.app.goo.gl/WsNkZWiXBEJM4pCw5") {
      publicId = flight.airlineLogo.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(publicId);
    }
    await Flight.findByIdAndDelete(flightId);
    res.status(200).json({
      message: "Flight deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { createFlight, findFlights, findOneFlight, deleteFlight };
