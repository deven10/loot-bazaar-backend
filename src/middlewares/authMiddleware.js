const jwt = require("jsonwebtoken");
const User = require("../Models/User");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select("-password");
      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({
        message: "Not authorized, Token Failed!",
      });
    }
  } else {
    return res.status(401).json({
      message: "Token not found!",
    });
  }
});

module.exports = protect;
