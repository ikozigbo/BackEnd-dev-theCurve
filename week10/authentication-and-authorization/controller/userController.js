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

module.exports = { newUser, signin, userVerify, logout, getAll };
