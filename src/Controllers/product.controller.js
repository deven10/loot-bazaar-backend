const Product = require("../Models/Product");
const asyncHandler = require("express-async-handler");
const cloudinary = require("../../cloudinary");
const fs = require("fs");

// ----------------------------
// Create product
const createProduct = asyncHandler(async (req, res) => {
  try {
    const imageUrls = [];
    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(file.path);
      imageUrls.push(result.secure_url);
      fs.unlinkSync(file.path); // delete from local after uploading
    }

    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      mrp: req.body.mrp,
      rating: req.body.rating,
      description: req.body.description,
      images: imageUrls,
      category: req.body.category,
    });
    await product.save();
    return res.status(201).json({
      message: "New Product added Successfully",
      product,
      status: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      status: false,
    });
  }
});

// ----------------------------
// Get all Product
const findAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find();
    // res.json(products);
    return res.status(200).json({
      message: "Products found",
      products,
      status: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      status: false,
    });
  }
});

// ----------------------------
// Get single Product
const findSingleProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    return res.status(200).json({
      message: "Product found",
      product,
      status: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      status: false,
    });
  }
});

module.exports = { createProduct, findAllProducts, findSingleProduct };
