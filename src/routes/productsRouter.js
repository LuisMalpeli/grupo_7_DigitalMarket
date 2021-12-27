const express = require('express')
const router = express.Router();
const productController = require('../controllers/productController');
const upload = require('../middleware/multer');
const validator = require('../middleware/validator-product')



//Capturo lo que venga a products y le muestro la lista de productos completa
router.get('/', productController.main);

//Creación de un producto:
//  1-Vista del formulario
router.get('/create', productController.create); //Mostrar el formulario
//  2-Envío del formulario
router.post('/create', upload.single('img'), validator, productController.createSend)//Mostrar el formulario


router.get('/cart', productController.cart);

//Muestra el detalle del producto
router.get('/:id', productController.detail);

//Borrar un producto
router.delete('/:id', productController.delete);

//Edición de un producto
//  1-Vista del formulario
router.get('/edit/:id', productController.edit);
//  2-Envío del formulario
router.put('/:id', upload.single('img'), validator, productController.editSend);


module.exports = router