const personModel = require("../models/model");
const cloudinary = require("../utils/cloudinary");
const fs = require("fs");
//const { validatePerson } = require("../middleware/personValidate");

const createProfile = async (req, res) => {
  try {
    console.log(req.file);
    const { personName, personPhone } = req.body;
    const result = await cloudinary.uploader.upload(req.file.path);

    const newPerson = new personModel({
      personName,
      personPhone,
      personProfile: result.secure_url,
    });
    fs.unlinkSync(req.file.path);
    const savePerson = await newPerson.save();
    if (newPerson) {
      res.status(200).json({
        message: "Created",
        data: savePerson,
      });
    } else {
      res.status(400).json({
        message: "failed",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getProfiles = async (req, res) => {
  try {
    const profiles = await profileModel.find();
    if (profiles === null) {
      res.status(200).json({
        message: "No profile found.",
        data: [],
      });
    } else {
      res.status(200).json({
        data: profiles,
      });
    }
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

// get a profile
const getProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await profileModel.findById(id);
    if (!profile) {
      res.status(404).json({
        message: `No profile with id ${id}`,
      });
    } else {
      res.status(200).json({
        data: profile,
      });
    }
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

// update profile
const updateProfile = async (req, res) => {
  try {
    const profile = await profileModel.findById(req.params.id);
    if (profile) {
      // Delete the existing image from local upload folder and Cloudinary
      if (profile.profileImage) {
        const publicId = profile.profileImage.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(publicId);
      }

      // Upload the new image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      // Update the profile data in MongoDB
      profile.profileName = req.body.profileName;
      profile.profilePhone = req.body.profilePhone;
      profile.profileProfileImage = result.secure_url;
      await profile.save();
      // Delete file from local upload folder
      fs.unlinkSync(req.file.path);

      res.json({ message: "profile updated successfully", data: profile });
    } else {
      res.status(404).json({ error: "profile not found" });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// delete profile
const deleteProfile = async (req, res) => {
  try {
    const profile = await profileModel.findById(req.params.id);
    if (profile) {
      // Delete the image from local upload folder and Cloudinary
      if (profile.profileImage) {
        const publicId = profile.profileImage.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(publicId);
      }

      // Delete the profile from MongoDB
      await profileModel.findByIdAndDelete(req.params.id);

      res.json({ message: "profile deleted successfully" });
    } else {
      res.status(404).json({ error: "profile not found" });
    }
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

module.exports = {
  createProfile,
  getProfiles,
  getProfile,
  updateProfile,
  deleteProfile,
};

// const updatePerson = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const person = await personModel.findById(id);
//     const { personName, personPhone } = req.body;
//   } catch (error) {}
// };
