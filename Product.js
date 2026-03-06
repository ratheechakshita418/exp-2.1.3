const mongoose = require("mongoose");

// Variant Schema
const variantSchema = new mongoose.Schema({
    sku: String,
    color: String,
    price: Number,
    stock: Number
});

// Review Schema
const reviewSchema = new mongoose.Schema({
    userId: String,
    rating: Number,
    comment: String
});

// Product Schema
const productSchema = new mongoose.Schema({
    name: String,
    category: String,
    variants: [variantSchema],
    reviews: [reviewSchema],
    avgRating: Number
});

// Index for performance
productSchema.index({ name: 1, category: 1 });

// Stock update method
productSchema.methods.updateStock = function (sku, quantity) {

    const variant = this.variants.find(v => v.sku === sku);

    if (!variant) return "Variant not found";

    variant.stock += quantity;

    return this.save();
};

module.exports = mongoose.model("Product", productSchema);
