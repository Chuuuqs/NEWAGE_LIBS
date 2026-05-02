const { getProducts, getProductById } = require('../controller/fakeStoreController');
const express = require('express');
const router = express.Router();

router.get('/products', getProducts);
router.get('/products/:id', getProductById);

module.exports = router;