const express = require('express')
const router = express.Router();
const productController = require('../controllers/productController')

router.get('/productDetail', productController.productDetail);
router.get('/productCart',productController.productCart);
router.get('/productCreate',productController.productCreate)


module.exports = router