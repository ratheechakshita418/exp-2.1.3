const Product = require("../models/Product");

// Add Product
exports.addProduct = async (req, res) => {

    const product = new Product(req.body);

    const savedProduct = await product.save();

    res.json(savedProduct);
};

// Get Products
exports.getProducts = async (req, res) => {

    const products = await Product.find();

    res.json(products);
};

// Add Review
exports.addReview = async (req, res) => {

    const product = await Product.findById(req.params.id);

    product.reviews.push(req.body);

    const avg =
        product.reviews.reduce((sum, r) => sum + r.rating, 0) /
        product.reviews.length;

    product.avgRating = avg;

    await product.save();

    res.json(product);
};

// Aggregation Example
exports.getAveragePrice = async (req, res) => {

    const result = await Product.aggregate([
        { $unwind: "$variants" },
        {
            $group: {
                _id: "$category",
                avgPrice: { $avg: "$variants.price" }
            }
        }
    ]);

    res.json(result);
};

// Update Stock
exports.updateStock = async (req, res) => {

    const { sku, quantity } = req.body;

    const product = await Product.findById(req.params.id);

    const result = await product.updateStock(sku, quantity);

    res.json(result);
};
