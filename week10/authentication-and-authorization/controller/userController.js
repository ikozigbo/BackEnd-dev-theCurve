const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

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

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await findOne({ email });
    if (user) {
      const isPassword = bcryptjs.compareSync(password, user.password);
      if (isPassword) {
        const token = jwt.sign(
          {
            userId: user._id,
            username: user.username,
            email,
          },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );
        res.status(200).json({
          success: true,
          user,
          token,
        });
      } else {
        res.status(400).json({
          message: "invalid credentials (password)",
        });
      }
    } else {
      res.status(400).json({
        message: "email already registered",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { newUser, signin };
