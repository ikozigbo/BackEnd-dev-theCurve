const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, callback) => {
    // Generate a unique name for the uploaded file
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);

    // Build the file name with the original file extension
    const extension = path.extname(file.originalname);
    const fileName = `${uniqueName}${extension}`;

    callback(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image supported"));
  }
};

const fileSize = { limits: 1024 * 1024 };

const upload = multer({
  storage,
  fileSize,
  fileFilter,
});

module.exports = upload;
