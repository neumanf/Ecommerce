const {
    getProductsFromDB,
    addProductToDB,
} = require("../services/products.service");

const getAllProducts = async (req, res) => {
    try {
        const products = await getProductsFromDB();

        res.status(200).json(products);
    } catch (e) {
        console.error(e);

        res.status(400).json({ error: "Error, please try again." });
    }
};

const addProduct = async (req, res) => {
    try {
        const product = await addProductToDB(req.body);

        res.status(200).json(product);
    } catch (e) {
        console.error(e);

        res.status(400).json({ error: "Error, please try again." });
    }
};

module.exports = {
    getAllProducts,
    addProduct,
};
