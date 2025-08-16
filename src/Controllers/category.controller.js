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
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ----------------------------
// Get all categories
const findAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
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
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = { createCategory, findAllCategories, updateCategory };
