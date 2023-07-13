const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const { sendEmail } = require("./emailController");

const newUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const isEmail = await User.findOne({ email });
    if (isEmail) {
      res.status(400).json({
        message: "email already registerd",
      });
    } else {
      const salt = bcryptjs.genSaltSync(10);
      const hash = bcryptjs.hashSync(password, salt);
      const user = await User.create({
        username,
        email: email.toLowerCase(),
        password: hash,
      });
      const subject = "New User";
      const link = `${req.protocol}://${req.get("host")}/api/verify/${
        user._id
      }`;
      const message = `welcome onboard kindly use this ${link} to verify your account`;
      const data = {
        email: email,
        subject,
        message,
      };
      sendEmail(data);
      res.status(200).json({
        success: true,
        user,
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
    const { id } = req.params;
    console.log(id);
    const verified = await User.findByIdAndUpdate(id, { isVerified: true });
    if (!verified) {
      res.json("unable to verify account");
    } else {
      res.status(200).json({
        message: "user verified",
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
    const { username, email, password } = req.body;
    const user = await User.findOne({ email });
    //console.log(user);
    let checkPassword = false;
    if (user) {
      checkPassword = bcryptjs.compareSync(password, user.password);
    }
    if (!user || !checkPassword) {
      res.status(404).json({
        message: "invalid credentials",
      });
    } else {
      req.session.isAuth = true;
      req.session.user = user;
      res.status(200).json({ user });
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
    res.json({ users });
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
      // for better security practice a unique token should be sent to reset password instead of user._id
      const link = `${req.protocol}://${req.get("host")}/api/reset-password/${
        user._id
      }`;
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
    const { id } = req.params;
    const { newpassword } = req.body;
    const salt = bcryptjs.genSaltSync(10);
    const hashedPassword = bcryptjs.hashSync(newpassword, salt);
    const user = await User.findByIdAndUpdate(id, { password: hashedPassword });
    if (user) {
      res.status(200).json({
        message: "password succesfully reset",
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
    req.session.destroy((err) => {
      if (err) throw err;
      res.status(200).json({ message: "logged out successful" });
    });
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
  forgotPassword,
  resetpassword,
};
