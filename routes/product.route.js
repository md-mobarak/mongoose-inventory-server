const express = require('express');
const router = express.Router()
const productController = require('../controlar/product.controlar')
router.route('/')
    .get(productController.getProducts)
    .post(productController.createProduct)



module.exports = router