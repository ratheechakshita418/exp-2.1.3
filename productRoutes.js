const express = require("express");
const router = express.Router();

const {
    addProduct,
    getProducts,
    addReview,
    getAveragePrice,
    updateStock
} = require("../controllers/productController");

// Routes
router.post("/product", addProduct);

router.get("/products", getProducts);

router.post("/review/:id", addReview);

router.get("/analytics/avg-price", getAveragePrice);

router.post("/stock/:id", updateStock);

module.exports = router;
