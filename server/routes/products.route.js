const express = require("express");
const {
    getAllProducts,
    addProduct,
    deleteProduct,
} = require("../controllers/products.controller");

const router = express.Router();

router.get("/products", getAllProducts);
router.post("/products", addProduct);
router.delete("/products", deleteProduct);

module.exports = router;
