const axios = require('axios');

const baseURL = 'https://fakestoreapi.com';

const apiClient = axios.create({
    baseURL: baseURL,
    timeout: 6000,
    headers: {
        'Content-Type': 'application/json'
    }
});


exports.getProducts = async () => {
    try {
        const response = await apiClient.get('https://fakestoreapi.com/products');
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

exports.getProductById = async (id) => {
    try {
        const response = await apiClient.get(`https://fakestoreapi.com/products/${id}`);    
        return response.data;
    } catch (error) {
        console.error('Error fetching product:', error);
        throw error;
    }
};

exports.createProducts = async (req, res) => {
    try {
        const {name, size, price, qty} = req.body;

            if (!name || !size || !price || !qty)
                return res.status(400).json({error: 'Input Required fields'});

            return res.status(201).json({message: 'Added Product', data: {name, size, price, qty}})
            
    } catch (error) {
        console.error('Error Creating', error)
        return res.status(500).json({error: 'Error Creating'});

    }
};