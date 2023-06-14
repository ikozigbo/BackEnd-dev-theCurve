const profileModel = require("../models/model");
const fs = require("fs");

// create new model
const newProfile = async (req, res) => {
  try {
    const { name, stack, age } = req.body;
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);

    const newProfile = await profileModel.create({
      name,
      stack,
      age,
      profilePicture: newPath,
    });
    if (!newProfile) {
      res.status(400).json({
        messaage: "error",
      });
    } else {
      res.status(200).json({
        messaage: "new profile created",
        data: newProfile,
        file: req.file.size,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// //get all
// const getAllRestaurants = async (req, res) => {
//   try {
//     const restaurants = await restaurantModel.find();
//     if (!restaurants) {
//       res.status(400).json({
//         messaage: "error",
//       });
//     } else {
//       res.status(200).json({
//         messaage: "restaurants",
//         data: restaurants,
//       });
//     }
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

// //get one by branch
// const getOneByBranch = async (req, res) => {
//   try {
//     const branch = req.params.branch;
//     const restaurant = await restaurantModel.findOne({ branch });
//     if (!restaurant) {
//       res.status(400).json({
//         messaage: "error",
//       });
//     } else {
//       res.status(200).json({
//         messaage: "branch found",
//         data: restaurant,
//       });
//     }
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

// //update  product
// const updateMenu = async (req, res) => {
//   try {

//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };
module.exports = {
  newProfile,
};
