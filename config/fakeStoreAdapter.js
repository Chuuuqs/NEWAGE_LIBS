const axios = require('axios');

const baseURL = 'https://fakestoreapi.com';

const apiClient = axios.create({
    baseURL: baseURL,
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json'
    }
});


exports.getProducts = async () => {
    try {
        const response = await apiClient.get('/products');
        return response.data;
    } catch (error) {
        console.error('AXIOS ERROR:', error.message);
        console.error('DETAILS:', error.code); // 👈 very useful
        throw error;
    }
};

exports.getProductById = async (id) => {
    try {
        const response = await apiClient.get(`/products/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching product:', error.message);
        throw error;
    }
};

exports.createProducts = async ({ name, size, price, qty }) => {
    try{ 
        if (!name || !size || price === null || qty === null) {
        throw new Error('Input Required fields');
    }
     return res.status(201).json({message: 'Added Product', data: {name, size, price, qty}})
            
    } catch (error) {
        console.error('Error Creating', error)
        return res.status(500).json({error: 'Error Creating'});

    }
};