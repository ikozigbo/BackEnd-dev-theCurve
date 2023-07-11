const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const alreadyExists = await User.findOne({ email });
    if (alreadyExists) {
      res.status(400).json({
        message: "user with this email already exists",
      });
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);
      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
      });
      res.status(200).json({
        message: "user created",
        newUser,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findOne({ email });
    //console.log(user);
    let checkPassword = false;
    if (user) {
      checkPassword = bcrypt.compareSync(password, user.password);
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

const landingPage = async (req, res) => {
  try {
    res.status(200).json({
      message: "welcome authenticated user",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { register, login, landingPage, logout };
