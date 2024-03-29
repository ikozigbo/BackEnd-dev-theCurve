const User = require("../model/userModel");

const signupAdmin = async (req, res) => {
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
        isAdmin: true,
        password: hash,
      });
      const token = await genToken(user._id, "30m");
      const subject = "New User";
      const link = `${req.protocol}://${req.get("host")}/api/verify/${token}`;
      const message = `welcome onboard kindly use this ${link} to verify your account`;
      const data = {
        email: email,
        subject,
        message,
      };
      //sendEmail(data);
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

const signupSuperAdmin = async (req, res) => {
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
        isAdmin: true,
        isSuperAdmin: true,
        password: hash,
      });
      const token = await genToken(user._id, "30m");
      const subject = "New User";
      const link = `${req.protocol}://${req.get("host")}/api/verify/${token}`;
      const message = `welcome onboard kindly use this ${link} to verify your account`;
      const data = {
        email: email,
        subject,
        message,
      };
      //sendEmail(data);
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

const upgradeUserToAdmin = async (req, res) => {
  try {
    const { userId } = req.params;
    const newAdmin = await User.findByIdAndUpdate(
      userId,
      { isAdmin: true },
      { new: true }
    );
    if (newAdmin) {
      res.status(200).json({ message: "success", newAdmin });
    } else {
      res.status(404).json({ message: "no such user" });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const upgradeUserToSuperAdmin = async (req, res) => {
  try {
    const { userId } = req.params;
    const newSuperAdmin = await User.findByIdAndUpdate(
      userId,
      { isAdmin: true, isSuperAdmin: true },
      { new: true }
    );
    if (newSuperAdmin) {
      res.status(200).json({ message: "success", newSuperAdmin });
    } else {
      res.status(404).json({ message: "no such user" });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  upgradeUserToAdmin,
  upgradeUserToSuperAdmin,
  signupAdmin,
  signupSuperAdmin,
};
