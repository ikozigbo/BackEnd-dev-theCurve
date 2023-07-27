const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

const genToken = async (id, time) => {
  const token = await jwt.sign(
    {
      userID: id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: time,
    }
  );
  return token;
};

const decodeToken = async (token) => {
  let user = null;
  await jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
    if (err) {
      throw err;
    } else {
      //console.log(data);
      user = await User.findById(data.userID);
      // console.log(user);
    }
  });
  return user;
};

module.exports = { genToken, decodeToken };
