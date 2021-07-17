const {
    getProductsFromDB,
    addProductToDB,
    deleteProductFromDB,
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
        await addProductToDB(req.body);

        res.status(200).json({ ok: true });
    } catch (e) {
        console.error(e);

        res.status(400).json({ error: "Error, please try again." });
    }
};

const deleteProduct = async (req, res) => {
    try {
        await deleteProductFromDB(req.body.id);

        res.status(200).json({ ok: true });
    } catch (e) {
        console.error(e);

        res.status(400).json({ error: "Error, please try again." });
    }
};

module.exports = {
    getAllProducts,
    addProduct,
    deleteProduct,
};
