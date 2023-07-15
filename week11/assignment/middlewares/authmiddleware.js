// auth middleware

const userAuth = async (req, res, next) => {
  try {
    // console.log(req.session);
    if (req.session.isAuth) {
      //console.log(req.session.user);
      next();
    } else {
      res.status(403).json({
        message: "please login",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    if (req.session.user.isAdmin) {
      next();
    } else {
      res.status(403).json({
        message: "you are not an admin",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { userAuth, isAdmin };
