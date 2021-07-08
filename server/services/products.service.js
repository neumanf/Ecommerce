const productsModel = require("../models/products.model");

const getProductsFromDB = async () => {
    try {
        return await productsModel.find({}).exec();
    } catch (e) {
        console.error(e);
    }
};

module.exports = {
    getProductsFromDB,
};
