const User = require("../model/userModel");

const upgradeUserToAdmin = async (req, res) => {
  try {
    const { userId } = req.params;
    const newAdmin = await User.findByIdAndUpdate(
      userId,
      { isAdmin: true },
      { new: true }
    );
    res.status(200).json({ message: "success", newAdmin });
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
    res.status(200).json({ message: "success", newSuperAdmin });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  upgradeUserToAdmin,
  upgradeUserToSuperAdmin,
};
