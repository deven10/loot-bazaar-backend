const express = require("express");
const {
  addToCart,
  getCart,
  updateQuantity,
  removeFromCart,
  clearCart,
} = require("../Controllers/cart.controller");
const protect = require("../middlewares/authMiddleware");
const cartRouter = express.Router();

// add to cart
cartRouter.post("/", protect, addToCart);

// get cart
cartRouter.get("/:userId", protect, getCart);

// update cart quantity
cartRouter.post("/update", protect, updateQuantity);

// remove product from cart
cartRouter.post("/remove", protect, removeFromCart);

// clear cart
cartRouter.post("/clear/:userId", protect, clearCart);

module.exports = cartRouter;
