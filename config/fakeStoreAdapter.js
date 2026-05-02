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
