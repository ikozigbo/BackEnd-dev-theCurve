const userAuth = async (req, res, next) => {
  try {
    if (req.session.isAuth) {
      console.log(req.session.user);
      next();
    } else {
      res.status(401).json({
        message: "not authenticated",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { userAuth };
