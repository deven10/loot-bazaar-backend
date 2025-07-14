const express = require("express");

const userRouter = express.Router();
userRouter.use(express.json());

const {
  addUser,
  findAllUsers,
  updateUser,
  deleteUser,
} = require("../Controllers/user.controller");

// creating a new user
userRouter.post("/", addUser);

// fetching all users
userRouter.get("/", findAllUsers);

// updating a particular user
userRouter.post("/:userId", updateUser);

// deleting a particular user
userRouter.delete("/:userId", deleteUser);

module.exports = userRouter;
