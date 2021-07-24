const {
    getProductsFromDB,
    addProductToDB,
    deleteProductFromDB,
} = require("../services/products.service");

const getAllProducts = async (req, res) => {
    try {
        const products = await getProductsFromDB();

        if (!products.error) res.status(200).json(products);
    } catch (e) {
        console.error(e);

        res.status(500).json({ error: "Error, please try again." });
    }
};

const addProduct = async (req, res) => {
    try {
        const product = await addProductToDB(req.body);

        if (!product.error) res.status(200).json({ product, ok: true });
        else res.status(400).json(product);
    } catch (e) {
        console.error(e);

        res.status(500).json({ error: "Error, please try again." });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const response = await deleteProductFromDB(req.body.id);

        if (response.ok === 1) res.status(200).json({ ok: true });
        else res.status(400).json(response);
    } catch (e) {
        console.error(e);

        res.status(500).json({ error: "Error, please try again." });
    }
};

module.exports = {
    getAllProducts,
    addProduct,
    deleteProduct,
};
