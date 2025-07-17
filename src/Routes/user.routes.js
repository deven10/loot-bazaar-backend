const express = require("express");

const userRouter = express.Router();
userRouter.use(express.json());

const {
  registerUser,
  findAllUsers,
  updateUser,
  deleteUser,
} = require("../Controllers/user.controller");

// creating/registering a new user
userRouter.post("/", registerUser);

// fetching all users
userRouter.get("/", findAllUsers);

// updating a particular user
userRouter.post("/:userId", updateUser);

// deleting a particular user
userRouter.delete("/:userId", deleteUser);

module.exports = userRouter;
