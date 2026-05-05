const apiAdapter = require('../config/fakeStoreAdapter');


exports.getProducts = async (req, res) => {
    const products = await apiAdapter.getProducts();
    res.json(products);
};

exports.getProductById = async (req, res) => {
    const product = await apiAdapter.getProductById(req.params.id);
    res.json(product);
};

exports.createProducts = async (req, res) => {
    
}