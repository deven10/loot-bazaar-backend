const User = require("../Models/User");
const asyncHandler = require("express-async-handler");

// ----------------------------
// for creating/registering a new User
const registerUser = asyncHandler(async (req, res) => {
  const body = req.body;

  const userExists = await User.findOne({ email: body.email });
  if (userExists) {
    return res
      .status(400)
      .json({ message: "User already exists", status: false });
  } else {
    const newUser = new User(body);
    const savedUser = await newUser.save();
    return res.status(201).json({
      message: "New User added Successfully",
      savedUser,
      status: true,
    });
  }
});

// ----------------------------
// for getting all Users
const findAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  if (users.length > 0) {
    res.status(200).json({ message: "users fetched successfully", users });
  } else {
    res.status(204).json({ message: "No user found" });
  }
});

// ----------------------------
// for updating an User
const updateUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const body = req.body;
  const user = await User.findByIdAndUpdate(userId, body, {
    new: true,
    runValidators: true,
  });
  if (user) {
    res.status(200).json({ message: "user updated successfully", user });
  } else {
    res.status(204).json({ message: "No user found" });
  }
});

// --------------------------------------
// delete an existing User

const deleteUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const user = await User.findByIdAndDelete(userId);
  if (user) {
    res.status(200).json({ message: "user deleted successfully", user });
  } else {
    res.status(204).json({ message: "No user found" });
  }
});

module.exports = { registerUser, findAllUsers, updateUser, deleteUser };
