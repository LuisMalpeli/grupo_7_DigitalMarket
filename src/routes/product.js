const express = require('express')
const router = express.Router();
const productController = require('../controllers/productController')

//Capturo lo que venga a products y le muestro la lista de productos completa
router.get('/', productController.main); //--> Todavía no está seteada esta vista
router.get('/productDetail', productController.productDetail);
router.get('/productCart',productController.productCart);
router.get('/productCreate',productController.productCreate)
router.get('/productEdit',productController.productEdit)


module.exports = router