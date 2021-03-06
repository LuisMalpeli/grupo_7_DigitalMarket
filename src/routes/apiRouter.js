const express = require('express');
const router = express.Router();
const apiController = require('../controllers/api_controller');

router.get('/users',apiController.userList);//return res.json con todos los usuarios.
router.get('/users/:id',apiController.userId);// return res.json(user)

router.delete('/users/:id',apiController.userDelete);//return res.json(response)

router.get('/products',apiController.productList);//return res.json(datos de los productos)
router.get('/products/:id',apiController.productId);//return res.json(product)

router.post('/products/crear',apiController.productCreate);// vista res.redirect('/')
router.put('/products/edit/:id',apiController.productUpdate);// vista res.redirect('/')

router.delete('/products/:id',apiController.productDelete);//  return res.json(res)

router.get('/categories',apiController.categoriesList);//return res.json
router.get('/userCategories',apiController.userTypesList);//return res.json
router.put('/userCategories', apiController.userTypeUpdate);//  req => db.Usuarios.update
// cada ruta de las APIS me devuelve un JSON o vista.
module.exports = router;

//JavaScript nos provee las funcionalidades de FETCH. Las cuales son de gran utilidad ya que nos permiten,(solicitudes asincrónicas del lado del front-end para hacer peticiones a dist APIS)
// de una manera sencilla y rápida, establecer una comunicación con un servidor a través de los distintos endpoints que nos provea su API.