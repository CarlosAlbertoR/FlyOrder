const express = require('express');
const product = require('../controller/product');

const app = express.Router();

app.get('/listProducts', product.getProducts)
app.get('/product/:productId', product.getProduct)
app.post('/product/saveProduct', product.saveProduct)
app.put('/product/:productId', product.updateProduct)
app.delete('/product/:productId', product.deleteProduct)

app.post('/product/search', product.search)

module.exports = app;