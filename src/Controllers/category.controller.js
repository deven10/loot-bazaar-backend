const Category = require("../Models/Category");
const asyncHandler = require("express-async-handler");
const cloudinary = require("../../cloudinary");
const fs = require("fs");

// ----------------------------
// Create category
const createCategory = asyncHandler(async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    const category = new Category({
      name: req.body.name,
      isPrimary: req.body?.isPrimary || true,
      imageUrl: result.secure_url,
    });
    await category.save();
    fs.unlinkSync(req.file.path);
    return res.status(201).json({
      message: "New Category created Successfully",
      category,
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
// Get all categories
const findAllCategories = asyncHandler(async (req, res) => {
  try {
    const categories = await Category.find();
    return res.status(200).json({
      message: "Categories found",
      categories,
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
// Update category
const updateCategory = asyncHandler(async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).send("Not found");

    // If new image is uploaded
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      category.imageUrl = result.secure_url;
      fs.unlinkSync(req.file.path);
    }

    category.name = req.body.name || category.name;
    category.isPrimary = req.body.isPrimary || category.isPrimary;
    await category.save();
    res.json(category);
    return res.status(201).json({
      message: "Category updated Successfully",
      category,
      status: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      status: false,
    });
  }
});

module.exports = { createCategory, findAllCategories, updateCategory };
