const express = require("express");

const authRouter = express.Router();
authRouter.use(express.json());

const { loginUser } = require("../Controllers/auth.controller");

// creating a new user / registering a new user
authRouter.post("/", loginUser);

module.exports = authRouter;
