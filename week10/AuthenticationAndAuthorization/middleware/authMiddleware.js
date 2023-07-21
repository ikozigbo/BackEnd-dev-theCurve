// const jwt = require('jsonwebtoken');

// // // auth middleware for the application
// // const userAuth = async (req, res, next)=>{
// //     const hasAuthorization = req.headers.authorization;
// //     if(!hasAuthorization) {
// //         res.status(404).json({
// //             message: 'No authorization found'
// //         })
// //     } else {
// //         console.log(hasAuthorization)
// //         const token = hasAuthorization.split(' ')[1];
// //         const decodedToken = await jwt.verify(token, "mySecret")
// //         req.userId = decodedToken.userId
// //     }
// //     next();
// // }

// // auth middleware for the application
// const userAuth = async (req, res, next)=>{
//     const hasAuthorization = req.headers.authorization;
//     if(!hasAuthorization) {
//         res.status(404).json({
//             message: 'No authorization found'
//         })
//     }
//     const token = hasAuthorization.split(' ')[1];
//     try {
//         console.log(hasAuthorization)
//         const decodedToken = await jwt.verify(token, "mySecret")
//         req.user = JSON.stringify(decodedToken)
//         req.userId = decodedToken.userId
//         req.userEmail = decodedToken.email
//         req.username = decodedToken.username
//         next()
//     } catch (error) {
//         res.status(500).json({
//             message: error.message
//         })
//     }
// }

// module.exports = {userAuth}

const jwt = require("jsonwebtoken");
const User = require("../models/model");

const dotenv = require("dotenv");
dotenv.config();

// auth middleware
const userAuth = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const hasAuthorization = req.headers.authorization;
      const token = hasAuthorization.split(" ")[1];

      const decodedToken = await jwt.verify(token, process.env.JWT_SECRETE);
      req.user = JSON.stringify(decodedToken);
      req.userId = decodedToken.userId;
      req.userEmail = decodedToken.email;
      req.username = decodedToken.username;
      next();
    } else {
      res.status(404).json({
        message: "No authorization found",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const isAdminAuthorized = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (user.isAdmin) {
      next();
    } else {
      res.status(401).json({ message: "not an admin" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const isSuperAdminAuthorized = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (user.isSuperAdmin) {
      next();
    } else {
      res.status(401).json({ message: "not a super admin" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { userAuth, isAdminAuthorized, isSuperAdminAuthorized };
