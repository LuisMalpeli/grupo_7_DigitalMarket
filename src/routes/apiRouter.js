const express = require('express')
const router = express.Router();
const apiController = require('../controllers/api_controller')

router.get('/users',apiController.userList)
router.get('/users/:id',apiController.userId)

router.get('/products',apiController.productList)
router.get('/products/:id',apiController.productId)
router.post('/products',apiController.productCreate)
router.post('/products/:id',apiController.productUpdate)
router.delete('/products/:id',apiController.productDelete)

module.exports = router