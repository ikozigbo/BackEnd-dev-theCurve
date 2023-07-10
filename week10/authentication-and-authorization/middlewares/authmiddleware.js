const jwt = require("jsonwebtoken");

// auth middleware
const userAuth = async (req, res, next) => {
  const hasAuth = req.headers.authorization;
  if (hasAuth) {
    const token = hasAuth.split(" ")[1];
    const decoded = jwt.verify(token, pr);
  } else {
    res.status(404).json({
      message: "Authorization token not found",
    });
  }
};
