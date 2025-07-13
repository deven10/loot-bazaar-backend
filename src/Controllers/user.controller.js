const User = require("../Models/User");

// ----------------------------
// for creating new User
async function addUser(userDetails) {
  try {
    const newUser = new User(userDetails);
    const savedUser = await newUser.save();
    return savedUser;
  } catch (e) {
    throw e;
  }
}

// ----------------------------
// for getting all Users
async function findAllUsers() {
  try {
    const users = await User.find();
    return users;
  } catch (e) {
    throw e;
  }
}

// ----------------------------
// for updating an User
async function updateUser(UserId, userDetails) {
  try {
    const updatedUser = await User.findByIdAndUpdate(UserId, userDetails, {
      new: true,
      runValidators: true,
    });
    return updatedUser;
  } catch (e) {
    throw e;
  }
}

// --------------------------------------
// delete an existing User
async function deleteUser(UserId) {
  try {
    const User = await User.findByIdAndDelete(UserId);
    return User;
  } catch (e) {
    throw e;
  }
}

module.exports = { addUser, findAllUsers, updateUser, deleteUser };
