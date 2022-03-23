const express = require('express');
const router = express.Router();
const apiController = require('../controllers/api_controller');

router.get('/users',apiController.userList);//return res.json
router.get('/users/:id',apiController.userId);// return res.json(user)

router.delete('/users/:id',apiController.userDelete);//return res.json(response)

router.get('/products',apiController.productList);//return res.json(datos)
router.get('/products/:id',apiController.productId);//return res.json(product)

router.post('/products/crear',apiController.productCreate);// vista ('/')
router.put('/products/edit/:id',apiController.productUpdate);// res.redirect('/')
router.delete('/products/:id',apiController.productDelete);//  return res.json(response)

router.get('/categories',apiController.categoriesList);//return res.json
router.get('/userCategories',apiController.userTypesList);//return res.json
router.put('/userCategories', apiController.userTypeUpdate);//  req => db.Usuarios.update
// cada ruta de las APIS me devuelve un JSON o vista.
module.exports = router;