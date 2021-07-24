const Product = require("../models/products.model");

const getProductsFromDB = async () => {
    try {
        return await Product.find({}).exec();
    } catch (e) {
        return { error: e.name };
    }
};

const addProductToDB = async (_product) => {
    try {
        const product = new Product({
            title: _product.title,
            image_url: _product.image_url,
            price: _product.price,
            categories: [_product.category],
        });

        return await product.save();
    } catch (e) {
        return { error: e.name };
    }
};

const deleteProductFromDB = async (id) => {
    try {
        return await Product.deleteOne({ _id: id });
    } catch (e) {
        return { error: e.name };
    }
};

module.exports = {
    getProductsFromDB,
    addProductToDB,
    deleteProductFromDB,
};
