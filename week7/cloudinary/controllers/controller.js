const contactModel = require("../models/model");
const myCloud = require("../config/cloudinary");

//Upload file and store data in MongoDB
// const newContact = (req, res) => {
//   const { name, message, email } = req.body;
//   const file = req.file;
//   console.log(req.files);

//   myCloud.uploader.upload(
//     file[0].path,
//     {
//       /* additional upload options */
//     },
//     (err, result) => {
//       if (err) {
//         console.error(err);
//         return res.status(500).json({ error: "Upload failed" });
//       }

//       const { public_id, secure_url } = result;

//       contactModel
//         .create({
//           name,
//           message,
//           email,
//           profilePicture: {
//             cloud_id: public_id,
//             cloud_url: secure_url,
//           },
//         })
//         .then((response) => {
//           console.log("Data stored in MongoDB");
//           // You can return a success response or perform additional actions
//           return res
//             .status(200)
//             .json({ message: "Data stored in MongoDB", data: response });
//         })
//         .catch((error) => {
//           console.error(error);
//           return res
//             .status(500)
//             .json({ error: "Failed to store data in MongoDB" });
//         });
//     }
//   );
// };

const newContact = async (req, res) => {
  try {
    const { name, message, email } = req.body;
    const file = req.files.profilePicture.tempFilePath;
    console.log(req.files);
    await myCloud.uploader.upload(file, {}, (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Upload failed" });
      } else {
        const newData = {
          name,
          email,
          message,
          profilePicture: {
            cloud_id: data.public_id,
            cloud_url: data.secure_url,
          },
        };
        contactModel.create(newData).then((response) => {
          res.status(200).json({
            kkk: "jjj",
            response,
          });
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { newContact };
