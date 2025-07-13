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
userRouter.post("/", async (req, res) => {
  try {
    const body = req.body;
    const user = await addUser(body);
    res.status(201).json({ message: "New User added Successfully", user });
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

// fetching all users
userRouter.get("/", async (req, res) => {
  try {
    const users = await findAllUsers();
    if (users.length > 0) {
      res.status(200).json({ message: "users fetched successfully", users });
    } else {
      res.status(204).json({ message: "No user found" });
    }
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

// updating a particular user
userRouter.post("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const body = req.body;
    const user = await updateUser(userId, body);
    if (user) {
      res.status(200).json({ message: "user updated successfully", user });
    } else {
      res.status(204).json({ message: "No user found" });
    }
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

// deleting a particular user
userRouter.delete("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await deleteUser(userId);
    if (user) {
      res.status(200).json({ message: "user deleted successfully", user });
    } else {
      res.status(204).json({ message: "No user found" });
    }
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

module.exports = userRouter;
