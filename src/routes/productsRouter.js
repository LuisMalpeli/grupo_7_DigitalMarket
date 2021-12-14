const express = require('express')
const router = express.Router();
const productController = require('../controllers/productController');
const upload = require('../middleware/multer');




//Capturo lo que venga a products y le muestro la lista de productos completa
router.get('/', productController.main);

//Creación de un producto:
//  1-Vista del formulario
router.get('/create', productController.create); //Mostrar el formulario
//  2-Envío del formulario
router.post('/create',upload.any(), productController.createSend)//Mostrar el formulario

//Muestra el detalle del producto
router.get('/:id', productController.detail);

router.delete('/:id',productController.delete);
//Edición de un producto
//  1-Vista del formulario
router.get('/edit/:id',productController.edit);
//  2-Envío del formulario
router.put('/:id',upload.any(),productController.editSend);



router.get('/productCart',productController.cart);






module.exports = router