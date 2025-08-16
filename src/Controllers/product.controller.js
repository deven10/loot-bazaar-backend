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
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ----------------------------
// Get all Product
const findAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// ----------------------------
// Update category
// const updateCategory = asyncHandler(async (req, res) => {
//   try {
//     const category = await Product.findById(req.params.id);
//     if (!category) return res.status(404).send("Not found");

//     // If new image is uploaded
//     if (req.file) {
//       const result = await cloudinary.uploader.upload(req.file.path);
//       category.imageUrl = result.secure_url;
//       fs.unlinkSync(req.file.path);
//     }

//     category.name = req.body.name || category.name;
//     category.isPrimary = req.body.isPrimary || category.isPrimary;
//     await category.save();
//     res.json(category);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

module.exports = { createProduct, findAllProducts };
