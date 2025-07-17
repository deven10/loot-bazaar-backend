const User = require("../Models/User");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../utils");

// ----------------------------
// for login a user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please Enter Email & Password!", status: false });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: "Invalid Email Id" });
  }

  const passwordMatching = await user.matchPassword(password);
  if (user && passwordMatching) {
    const userData = user.toObject();
    delete userData.password;
    return res.status(200).json({
      user: {
        ...userData,
        token: generateToken(user._id),
      },
      message: "Logged in Successfully!",
    });
  } else {
    return res
      .status(403)
      .json({ message: "Invalid Email or Password!", status: false });
  }
});

module.exports = { loginUser };
