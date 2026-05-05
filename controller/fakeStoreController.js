const apiAdapter = require('../config/fakeStoreAdapter');


exports.getProducts = async (req, res) => {
    try {
        const products = await apiAdapter.getProducts();
        return res.json(products);
    } catch (error) {
        console.error('FULL ERROR:', error);
        return res.status(500).json({error: error.message});
    }
    }

exports.getProductById = async (req, res) => {
    try {
        const product = await apiAdapter.getProductById(req.params.id);
        return res.json(product);
    } catch (error) {
        console.error('FULL ERROR:', error);
        return res.status(500).json({error: error.message});
    }
};

exports.createProducts = async (req, res) => {
    try {
        const { name, size, price, qty } = req.body;
        const newProduct = await apiAdapter.createProducts({ name, size, price, qty });
        return res.status(201).json(newProduct);
    } catch (error) {
        console.error('FULL ERROR:', error);
        return res.status(500).json({error: error.message});
    }
};