const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, default: 1, min: 1 },
      },
    ],
  },
  { timestamps: true }
);

// Virtual field for total cart price
CartSchema.virtual("cartTotal").get(function () {
  return this.products.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
});

module.exports = mongoose.model("Cart", CartSchema);
