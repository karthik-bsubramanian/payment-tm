const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(400).json({
      message: "something happened",
    });
  }

  const usertoken = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(usertoken, JWT_SECRET);

    req.userid = decoded.userid;

    next();
  } catch (err) {
    return res.status(403).json({
      message: "something happened",
    });
  }
};

module.exports = authMiddleware;
