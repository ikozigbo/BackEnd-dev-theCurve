const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

const newUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const salt = bcryptjs.genSaltSync(10);
    const hash = bcryptjs.hashSync(password, salt);

    const token = jwt.sign(
      {
        username,
        password,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const newuser = await User.create({
      username,
      email: email.toLowerCase(), //convert to lowercase for consistency in db and also avoid confusion
      password: hash,
      token,
    });
    res.status(200).json({
      newuser,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { newUser };
