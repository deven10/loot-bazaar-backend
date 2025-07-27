const express = require("express");
const router = express.Router();
const Category = require("../Models/Category");
const multer = require("multer");
const cloudinary = require("../../cloudinary");
const fs = require("fs");

// Upload middleware (memory storage)
const upload = multer({ dest: "uploads/" });

// Create category
router.post("/", upload.single("image"), async (req, res) => {
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

// Update category
router.put("/:id", upload.single("image"), async (req, res) => {
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

// Get all categories
router.get("/", async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
});

module.exports = router;

// ---------------
// const express = require("express");

// const userRouter = express.Router();
// userRouter.use(express.json());

// const {
//   registerUser,
//   findAllUsers,
//   updateUser,
//   deleteUser,
// } = require("../Controllers/user.controller");

// // creating/registering a new user
// userRouter.post("/", registerUser);

// // fetching all users
// userRouter.get("/", findAllUsers);

// // updating a particular user
// userRouter.post("/:userId", updateUser);

// // deleting a particular user
// userRouter.delete("/:userId", deleteUser);

// module.exports = userRouter;
