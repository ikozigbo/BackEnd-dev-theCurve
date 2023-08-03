const Tour = require("../model/tourModel");
const cloudinary = require("../utilities/cloudinary");

//create tour
const createTour = async (req, res) => {
  try {
    const { tourName, city, country, info, amenities } = req.body;
    const newTour = await Tour.create({
      tourName,
      city,
      country,
      info,
      amenities,
    });
    if (req.files) {
      let images = [];
      if (req.files.images.length > 1) {
        for (let index = 0; index < req.files.images.length; index++) {
          const result = await cloudinary.uploader.upload(
            req.files.images[index].tempFilePath
          );
          images.push(result.secure_url);
        }
      } else {
        const result = await cloudinary.uploader.upload(
          req.files.images.tempFilePath
        );
        images.push(result.secure_url);
      }

      newTour.images = images;
      await newTour.save();
    }
    const tour = await Tour.findById(newHotel._id);
    res.status(200).json({
      success: true,
      tour,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// get based tours on request query
const searchTours = async (req, res) => {
  try {
    // Copy the original req.query object to avoid modifying it directly
    const queryObj = { ...req.query };

    // Define an array of allowed fields
    const allowedFields = ["city", "country", "tourName"];

    // Loop through the queryObj and delete any field that is not in the allowedFields array
    for (const key in queryObj) {
      if (!allowedFields.includes(key)) {
        delete queryObj[key];
      }
    }

    // Now query the database with the modified queryObj
    const tours = await Tour.find(queryObj);

    res.status(200).json({
      success: true,
      tours,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// get one hotel by id
const findTourById = async (req, res) => {
  try {
    const { id } = req.params;
    const tour = await Tour.findById(id);
    res.status(200).json({
      success: true,
      tour,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateTourById = async (req, res) => {
  try {
    const { id } = req.params;
    const { tourName, city, country, info, amenities } = req.body;
    const tour = await Tour.findByIdAndUpdate(
      id,
      { tourName, city, country, info, amenities },
      { new: true }
    );
    if (req.files) {
      let images = [];
      if (req.files.images.length > 1) {
        for (let index = 0; index < tour.images.length; index++) {
          publicId = tour.images[index].split("/").pop().split(".")[0];
          await cloudinary.uploader.destroy(publicId);
        }
        for (let index = 0; index < req.files.images.length; index++) {
          const result = await cloudinary.uploader.upload(
            req.files.images[index].tempFilePath
          );
          images.push(result.secure_url);
        }
      } else {
        for (let index = 0; index < hotel.images; index++) {
          publicId = hotel.images[index].split("/").pop().split(".")[0];
          await cloudinary.uploader.destroy(publicId);
        }
        const result = await cloudinary.uploader.upload(
          req.files.images.tempFilePath
        );
        images.push(result.secure_url);
      }
      tour.images = images;
      await tour.save();
    }
    const updatedTour = await Tour.findById(tour._id);
    res.status(200).json({
      success: true,
      updatedTour,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteTourById = async (req, res) => {
  try {
    const { id } = req.params;
    const tour = await tour.findById(id);
    //delete all the photos from Cloudinary before deleting the tour record in DB
    for (let index = 0; index < tour.images.length; index++) {
      publicId = tour.images[index].split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(publicId);
    }
    await Tour.findByIdAndDelete(id);
    res.status(200).json({
      message: "Tour deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createTour,
  searchTours,
  findTourById,
  updateTourById,
  deleteTourById,
};
