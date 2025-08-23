const express = require("express");
const multer = require("multer");
const {
  createProduct,
  findAllProducts,
  findSingleProduct,
} = require("../Controllers/product.controller");
const productRouter = express.Router();

// Upload middleware (memory storage)
const upload = multer({ dest: "uploads/" });

// creating a new product
productRouter.post("/", upload.array("images", 5), createProduct);

// fetching all products
productRouter.get("/", findAllProducts);

// fetching single products
productRouter.get("/:id", findSingleProduct);

// updating a particular user
// productRouter.post("/:userId", updateUser);

// deleting a particular user
// productRouter.delete("/:userId", deleteUser);

module.exports = productRouter;
