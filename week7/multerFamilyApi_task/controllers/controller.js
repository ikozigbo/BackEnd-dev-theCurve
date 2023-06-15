const familyModel = require("../models/model");
const fs = require("fs");

// create new model
const newFamily = async (req, res) => {
  try {
    if (!req.files) {
      res.status(400).json({
        messaage: "error uploading images",
      });
    } else {
      const { fatherName, motherName, children } = req.body;
      const files = req.files;
      let paths = [];
      files.forEach((file) => {
        const { originalname, path } = file;
        const parts = originalname.split(".");
        const ext = parts[parts.length - 1];
        const newPath = path + "." + ext;
        fs.renameSync(path, newPath);
        paths.push(newPath);
      });

      const newfamily = await familyModel.create({
        fatherName,
        motherName,
        children,
        childrenImages: paths,
      });
      if (!newfamily) {
        res.status(400).json({
          messaage: "error",
        });
      } else {
        res.status(200).json({
          messaage: "new family created",
          data: newfamily,
          file: req.files,
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//get all families
const getFamilies = async (req, res) => {
  try {
    const families = await familyModel.find();
    if (families.length === 0) {
      res.status(400).json({
        message: "No family in database",
      });
    } else {
      res.status(200).json({
        message: "All families",
        data: families,
      });
    }
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

//get one family
const getOneFamilyById = async (req, res) => {
  try {
    const familyId = req.params.id;
    const family = await familyModel.findById(familyId);
    if (!family) {
      res.status(404).json({
        message: "family not found",
      });
    } else {
      res.status(200).json({
        data: family,
      });
    }
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

//update family

const getAndUpdate = async (req, res) => {
  try {
    const familyId = req.params.id;
    const family = await familyModel.findById(familyId);
    const { fatherName, motherName, children } = req.body;
    let imagePaths = [];
    if (req.files.length > 0) {
      let files = req.files;
      let previousImages = family.childrenImages;
      files.forEach((image) => {
        const { originalname, path } = image;
        const parts = originalname.split(".");
        const ext = parts[parts.length - 1];
        const newPath = path + "." + ext;
        fs.renameSync(path, newPath);
        imagePaths.push(newPath);
      });
      // deleting previous upload
      previousImages.forEach((image) => {
        if (fs.existsSync(image)) {
          fs.unlinkSync(image);
        }
      });
    }
    const updatedFields = {
      fatherName: fatherName || family.fatherName,
      motherName: motherName || family.motherName,
      children: children || family.children,
      childrenImages:
        imagePaths.length === 0 ? family.childrenImages : imagePaths,
    };
    const updatedFamily = await familyModel.findByIdAndUpdate(
      family,
      updatedFields,
      { new: true, runValidators: true }
    );
    if (!updatedFamily) {
      res.status(404).json({
        message: "family not found",
      });
    } else {
      res.status(200).json({
        data: updatedFamily,
      });
    }
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

// Delete a particular family
const deleteFamily = async (req, res) => {
  const familyId = req.params.id;
  try {
    const family = await familyModel.findById(familyId);
    if (!family) {
      return res.status(404).json({
        message: "family not found.",
      });
    }
    const images = family.childrenImages;
    images.forEach((image) => {
      if (fs.existsSync(image)) {
        fs.unlinkSync(image);
      }
    });
    const deletedFamily = await familyModel.findByIdAndDelete(familyId);
    res.status(200).json({
      message: "family deleted successfully",
      deletedFamily,
    });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

module.exports = {
  newFamily,
  getFamilies,
  getOneFamilyById,
  getAndUpdate,
  deleteFamily,
};
