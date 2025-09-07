const Product = require("../Models/Product");
const Cart = require("../Models/Cart");
const asyncHandler = require("express-async-handler");
const fs = require("fs");

// ----------------------------
// POST /cart/add
const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity = 1 } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({
        user: userId,
        products: [
          {
            productId,
            quantity,
          },
        ],
      });
    } else {
      const itemIndex = cart.products.findIndex(
        (p) => p.productId.toString() === productId
      );

      if (itemIndex > -1) {
        cart.products[itemIndex].quantity += quantity;
      } else {
        cart.products.push({
          productId,
          quantity,
        });
      }
    }

    await cart.save();

    // repopulate to ensure full product info is returned after save
    cart = await cart.populate("products.productId");

    return res.status(200).json({
      message: "Added to Cart Successfully",
      cart,
      status: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

// ----------------------------
// GET /cart/:userId
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.params.userId }).populate(
      "products.productId"
    );
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    return res.status(200).json({
      message: "Cart details found",
      ...cart.toObject(),
      total: cart.cartTotal,
      status: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

// ----------------------------
// PUT /cart/update
const updateQuantity = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    let cart = await Cart.findOne({ user: userId }).populate(
      "products.productId"
    );
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const itemIndex = cart.products.findIndex(
      (p) => p.productId._id == productId
    );

    if (itemIndex === -1)
      return res.status(404).json({ message: "Product not in cart" });

    cart.products[itemIndex].quantity = quantity;

    await cart.save();

    // repopulate to ensure full product info is returned after save
    cart = await cart.populate("products.productId");

    return res.status(201).json({
      message: "Cart updated Successfully",
      cart,
      status: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

// DELETE /cart/remove
const removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    let cart = await Cart.findOne({ user: userId }).populate(
      "products.productId"
    );
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    // Filter out the product
    cart.products = cart.products.filter((p) => p.productId._id != productId);

    await cart.save();

    // repopulate to ensure full product info is returned after save
    cart = await cart.populate("products.productId");

    return res.status(200).json({
      message: "Product removed from cart successfully",
      cart,
      status: true,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /cart/clear/:userId
const clearCart = async (req, res) => {
  try {
    await Cart.findOneAndDelete({ user: req.params.userId });
    return res.status(200).json({
      message: "Cart cleared Successfully",
      status: true,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  addToCart,
  getCart,
  updateQuantity,
  removeFromCart,
  clearCart,
};
