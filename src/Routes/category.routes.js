const express = require("express");
const multer = require("multer");
const {
  createCategory,
  updateCategory,
  findAllCategories,
} = require("../Controllers/category.controller");
const categoryRouter = express.Router();

// Upload middleware (memory storage)
const upload = multer({ dest: "uploads/" });

// Create category
categoryRouter.post("/", upload.single("image"), createCategory);

// Update category
categoryRouter.put("/:id", upload.single("image"), updateCategory);

// Get all categories
categoryRouter.get("/", findAllCategories);

module.exports = categoryRouter;
