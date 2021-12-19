const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const upload = require('../middleware/multer');



//***CRUD de productos****//

//1-Capturo lo que venga a products y le muestro la lista de productos completa
router.get('/', productController.main);


//2-Vista del formulario create
router.get('/create',productController.create); //Mostrar el formulario
//4-Envío del formulario
router.post('/create',productController.createSend)//Mostrar el formulario

//3-Muestra el detalle del producto
router.get('/:id', productController.detail);
//7-Delete
router.delete('/:id',productController.delete)

//5-Edición de un producto
router.get('/edit/:id',productController.edit);
//6-Envío del formulario
router.put('/:id',upload.any(),productController.editSend);



router.get('/productCart',productController.cart);






module.exports = router;