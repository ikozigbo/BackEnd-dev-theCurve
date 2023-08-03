const User = require("../model/userModel");
const cloudinary = require("../utilities/cloudinary");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const { sendEmail } = require("../middlewares/sendEmail");
const { genToken, decodeToken } = require("../utilities/jwt");
const fs = require("fs");
const { generateDynamicEmail } = require("../utilities/emailTemplate");

const newUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    const isEmail = await User.findOne({ email });
    if (password === confirmPassword) {
      if (isEmail) {
        res.status(409).json({
          message: "email already registerd",
        });
      } else {
        const salt = bcryptjs.genSaltSync(10);
        const hash = bcryptjs.hashSync(password, salt);
        const user = await User.create({
          firstName,
          lastName,
          email: email.toLowerCase(),
          password: hash,
        });
        const token = await genToken(user._id, "30m");
        const subject = "New User";
        const link = `http://localhost:5173/verify?token=${token}`;
        // const message = `welcome onboard kindly use this ${link} to verify your account`;
        const html = await generateDynamicEmail(link);
        const data = {
          email: email,
          subject,
          html,
        };
        sendEmail(data);
        res.status(201).json({
          success: true,
          user,
        });
      }
    } else {
      res.status(400).json({
        message: "Your password and Confirm password must match",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const userVerify = async (req, res) => {
  try {
    const { token } = req.params;
    console.log(token);
    //console.log(id);
    const userInfo = await decodeToken(token);
    console.log(userInfo);
    //const tokens = await jwt.verify(token, process.env.JWT_SECRET);
    if (userInfo) {
      await User.findByIdAndUpdate(userInfo._id, { isVerified: true });
      res.status(200).json({ message: "user verified" });
    } else {
      throw new Error("error verifying user, try again");
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const resendEmailVerification = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user && !user.isVerified) {
      const token = await genToken(user._id, "30m");
      const subject = "New User";
      const link = `${req.protocol}://${req.get(
        "host"
      )}/trippy/verify/${token}`;
      const message = `welcome onboard kindly use this ${link} to verify your account`;
      const data = {
        email: email,
        subject,
        message,
      };
      sendEmail(data);
      res.status(200).json({
        message: "verificaton email sent",
      });
    } else if (user?.isVerified) {
      res.status(200).json({
        message: "user already verified",
      });
    } else {
      res.status(404).json({
        message: "user with email not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    //console.log(user);
    let checkPassword = false;
    if (user) {
      checkPassword = bcryptjs.compareSync(password, user.password);
    }
    if (!user || !checkPassword) {
      res.status(400).json({
        message: "invalid credentials",
      });
    } else if (user.isBlocked) {
      res.status(200).json({ message: "This user is blocked" });
    } else if (!user.isVerified) {
      const token = await genToken(user._id, "30m");
      const subject = "verify now";
      const link = `${req.protocol}://${req.get(
        "host"
      )}/trippy/verify/${token}`;
      const message = ` kindly use this ${link} to verify your account`;
      const data = {
        email: email,
        subject,
        message,
      };
      sendEmail(data);
      res.status(401).json({
        message: "you are not verified check your email to verify",
      });
    } else {
      user.isloggedin = true;
      const token = await genToken(user._id, "1d");
      await user.save();

      res.status(200).json({ token, user });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAll = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getOne = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateUserName = async (req, res) => {
  try {
    const { userId } = req.params;
    const { firstName, lastName } = req.body;
    const user = await User.findById(userId);
    console.log(req.user._id.toString());
    console.log(user.id);
    if (!user) {
      res.status(404).json({ message: "no user found" });
    } else if (req.user._id.toString() == userId || req.user.isAdmin) {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { firstName, lastName },
        { new: true }
      );

      res.status(200).json({ message: "user name updated", updatedUser });
    } else {
      res
        .status(401)
        .json({ messgae: "you are not authorized to update this user" });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//add profile picture
// update profile
const addProfilePicture = async (req, res) => {
  try {
    const profile = await User.findById(req.user._id);
    if (profile) {
      //console.log(req.files);

      let result = null;
      // Delete the existing image from local upload folder and Cloudinary
      if (req.files) {
        if (profile.profilePicture) {
          const publicId = profile.profilePicture
            .split("/")
            .pop()
            .split(".")[0];
          //console.log(publicId);
          await cloudinary.uploader.destroy(publicId);
        }
        result = await cloudinary.uploader.upload(
          req.files.profilePicture.tempFilePath
        );
        // Delete file from local upload folder
        //fs.unlinkSync(req.file.path);
        profile.set({
          profilePicture: result.secure_url,
        });
        await profile.save();

        const updated = await User.findById(req.user._id);

        res
          .status(200)
          .json({ message: "profile updated successfully", data: updated });
      } else {
        res.status(400).json({ error: "no profile picture added" });
      }
    } else {
      res.status(404).json({ error: "profile not found" });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//update profile piicture

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    console.log(req.user._id.toString());
    console.log(user.id);
    if (!user) {
      res.status(404).json({ message: "no user found" });
    } else if (req.user._id.toString() == userId || req.user.isAdmin) {
      const deletedUser = await User.findByIdAndDelete(userId);
      res.status(200).json({ message: "user deleted", deletedUser });
    } else {
      res
        .status(401)
        .json({ messgae: "you are not authorized to delete this user" });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    //create a link with the reset password link and send it to email
    const user = await User.findOne({ email });
    if (user) {
      const subject = "forgotten password";
      const token = await genToken(user._id, "30m");
      // for better security practice a unique token should be sent to reset password instead of user._id
      const link = `${req.protocol}://${req.get(
        "host"
      )}/trippy/reset-password/${token}`;
      const message = `click the ${link} to reset your password`;
      const data = {
        email: email,
        subject,
        message,
      };
      sendEmail(data);
      res.status(200).json({
        message: "Check your registered email for your password reset link",
      });
    } else {
      res.status(404).json({
        message: "user not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const resetpassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newpassword } = req.body;
    const salt = bcryptjs.genSaltSync(10);
    const hashedPassword = bcryptjs.hashSync(newpassword, salt);
    const userInfo = await decodeToken(token);
    const user = await User.findByIdAndUpdate(userInfo._id, {
      password: hashedPassword,
    });
    if (user) {
      res.status(200).json({
        message: "password successfully reset",
      });
    } else {
      res.status(500).json({
        message: "error changing password",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const logout = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const blacklist = [];
    const hasAuthorization = req.headers.authorization;
    const token = hasAuthorization.split(" ")[1];
    blacklist.push(token);
    user.isloggedin = false;
    await user.save();
    res.status(200).json({ message: "logged out successfully" });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  newUser,
  signin,
  userVerify,
  logout,
  getAll,
  getOne,
  updateUserName,
  addProfilePicture,
  deleteUser,
  forgotPassword,
  resetpassword,
  resendEmailVerification,
};
