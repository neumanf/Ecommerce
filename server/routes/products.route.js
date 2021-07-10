const express = require("express");
const {
    getAllProducts,
    addProduct,
} = require("../controllers/products.controller");

const router = express.Router();

router.get("/products", getAllProducts);
router.post("/products", addProduct);

module.exports = router;
