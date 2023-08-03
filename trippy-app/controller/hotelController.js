const Hotel = require("../model/hotelModel");
const cloudinary = require("../utilities/cloudinary");

//create hotel
const createHotel = async (req, res) => {
  try {
    const {
      hotelName,
      city,
      country,
      address,
      description,
      checkIn,
      checkOut,
      pricePerNight,
      features,
      maxPerRoom,
    } = req.body;
    const newHotel = await Hotel.create({
      hotelName,
      city,
      country,
      address,
      description,
      checkIn,
      checkOut,
      pricePerNight,
      features,
      maxPerRoom,
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

      newHotel.images = images;
      await newHotel.save();
    }
    const hotel = await Hotel.findById(newHotel._id);
    res.status(200).json({
      success: true,
      hotel,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// get based on request query
const searchHotels = async (req, res) => {
  try {
    // Copy the original req.query object to avoid modifying it directly
    console.log(req.query)
    const queryObj = { ...req.query };

    // Define an array of allowed fields
    const allowedFields = ["city", "country", "hotelName"];

    // Loop through the queryObj and delete any field that is not in the allowedFields array
    for (const key in queryObj) {
      if (!allowedFields.includes(key)) {
        delete queryObj[key];
      }
    }

    // Now query the database with the modified queryObj
    const hotels = await Hotel.find(queryObj);

    res.status(200).json({
      success: true,
      hotels,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// get one hotel by id
const findHotelById = async (req, res) => {
  try {
    const { id } = req.params;
    const hotel = await Hotel.findById(id).populate("ratings.postedBy", [
      "firstName",
      "lastName",
    ]);
    res.status(200).json({
      success: true,
      hotel,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateHotelById = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      hotelName,
      city,
      country,
      address,
      description,
      checkIn,
      checkOut,
      pricePerNight,
      features,
      maxPerRoom,
    } = req.body;
    const hotel = await Hotel.findByIdAndUpdate(
      id,
      {
        hotelName,
        city,
        country,
        address,
        description,
        checkIn,
        checkOut,
        pricePerNight,
        features,
        maxPerRoom,
      },
      {
        new: true,
      }
    );
    if (req.files) {
      let images = [];
      if (req.files.images.length > 1) {
        for (let index = 0; index < hotel.images.length; index++) {
          publicId = hotel.images[index].split("/").pop().split(".")[0];
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
      hotel.images = images;
      await hotel.save();
    }
    const updatedHotel = await Hotel.findById(hotel._id);
    res.status(200).json({
      success: true,
      updatedHotel,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteHotelById = async (req, res) => {
  try {
    const { id } = req.params;
    const hotel = await Hotel.findById(id);
    //delete all the photos from Cloudinary before deleting the hotel record in DB
    for (let index = 0; index < hotel.images.length; index++) {
      publicId = hotel.images[index].split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(publicId);
    }
    await Hotel.findByIdAndDelete(id);
    res.status(200).json({
      message: "Hotel deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// "ratings.$.star": This is the path to the field that we want to update.
// In this case, it refers to the star field within an array element called ratings.
// The $ symbol is a positional operator that represents the matched array element position for the update operation.

const hotelRating = async (req, res) => {
  const { _id } = req.user;
  const { star, comment } = req.body;
  const { hotelId } = req.params;
  try {
    const hotel = await Hotel.findById(hotelId);
    let alreadyRated = hotel.ratings.find(
      (obj) => obj.postedBy?.toString() === _id.toString()
    );
    if (alreadyRated) {
      const updateRating = await Hotel.updateOne(
        {
          ratings: {
            $elemMatch: alreadyRated,
          },
        },
        {
          $set: { "ratings.$.star": star, "ratings.$.comment": comment },
        },
        { new: true }
      );
      // res.json(updateRating);
    } else {
      const ratedHotel = await Hotel.findByIdAndUpdate(
        hotelId,
        {
          $push: {
            ratings: {
              star: star,
              comment: comment,
              postedBy: _id,
            },
          },
        },
        { new: true }
      );
      // res.json(ratedProduct);
    }
    ////the next line of code is to calculate the average star rating
    const ratedHotel = await Hotel.findById(hotelId);
    //console.log(productWithRatings.ratings);
    let totalRatings = ratedHotel.ratings.length;
    let sumOfStars = ratedHotel.ratings
      .map((rating) => rating.star)
      .reduce((prev, curr) => prev + curr, 0);
    let starRating = Math.round(sumOfStars / totalRatings);
    const finalUpdate = await Hotel.findByIdAndUpdate(
      hotelId,
      {
        starRating,
      },
      { new: true }
    ).populate("ratings.postedBy", ["firstName", "lastName"]);
    res.status(200).json(finalUpdate);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteHotelRating = async (req, res) => {
  const { _id } = req.user;
  const { hotelId } = req.params;
  try {
    const hotel = await Hotel.findById(hotelId);
    let alreadyRated = hotel.ratings.find(
      (obj) => obj.postedBy.toString() === _id.toString()
    );
    if (alreadyRated) {
      const updatedHotel = await Hotel.findByIdAndUpdate(
        hotelId,
        {
          $pull: {
            ratings: {
              postedBy: _id,
            },
          },
        },
        { new: true }
      );
      // Recalculate the star rating after removing the rating
      let totalRatings = updatedHotel.ratings.length;
      let sumOfStars = updatedHotel.ratings
        .map((rating) => rating.star)
        .reduce((prev, curr) => prev + curr, 0);
      starRating = totalRatings > 0 ? Math.round(sumOfStars / totalRatings) : 0;
      console.log(starRating);
      const finalupdatedHotel = await Hotel.findByIdAndUpdate(
        hotelId,
        {
          starRating,
        },
        { new: true }
      ).populate("ratings.postedBy", ["firstName", "lastName"]);
      res.status(200).json(finalupdatedHotel);
    } else {
      res.status(404).json({
        message: "Rating not found for this hotel and user.",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createHotel,
  searchHotels,
  findHotelById,
  updateHotelById,
  deleteHotelById,
  hotelRating,
  deleteHotelRating,
};
