const User = require("../Models/User");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../utils");

// ----------------------------
// for creating/registering a new User
const registerUser = asyncHandler(async (req, res) => {
  try {
    const body = req.body;
    const userExists = await User.findOne({ email: body.email });
    if (userExists) {
      return res
        .status(400)
        .json({ message: "User already exists", status: false });
    } else {
      const newUser = new User(body);
      const user = await newUser.save();
      const userData = user.toObject();
      delete userData.password;
      return res.status(201).json({
        message: "New User added Successfully",
        user: { ...userData, token: generateToken(userData._id) },
        status: true,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      status: false,
    });
  }
});

// ----------------------------
// for getting all Users
const findAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find();
    if (users.length > 0) {
      res.status(200).json({
        message: "users fetched successfully",
        users,
        status: true,
      });
    } else {
      res.status(204).json({ message: "No user found", status: false });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      status: false,
    });
  }
});

// ----------------------------
// for updating an User
const updateUser = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.params;
    const body = req.body;
    const user = await User.findByIdAndUpdate(userId, body, {
      new: true,
      runValidators: true,
    });
    if (user) {
      res
        .status(200)
        .json({ message: "user updated successfully", user, status: true });
    } else {
      res.status(204).json({ message: "No user found", status: false });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      status: false,
    });
  }
});

// --------------------------------------
// delete an existing User
const deleteUser = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findByIdAndDelete(userId);
    if (user) {
      res
        .status(200)
        .json({ message: "user deleted successfully", user, status: true });
    } else {
      res.status(204).json({ message: "No user found", status: false });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      status: false,
    });
  }
});

module.exports = { registerUser, findAllUsers, updateUser, deleteUser };
