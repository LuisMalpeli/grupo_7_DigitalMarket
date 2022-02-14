const express = require('express')
const router = express.Router();
const productController = require('../controllers/product_controller');
const upload = require('../middleware/multer');
const validatorCreate = require('../middleware/validator-product')
const validatorEdit = require('../middleware/validator-edit-product')



//Capturo lo que venga a products y le muestro la lista de productos completa
router.get('/', productController.list);

//Creación de un producto:
//  1-Vista del formulario
router.get('/create', productController.create); //Mostrar el formulario
//  2-Envío del formulario
router.post('/create', upload.single('img'), validatorCreate, productController.createSend)//Mostrar el formulario


router.get('/cart', productController.cart);

//Muestra el detalle del producto
router.get('/:id', productController.detail);

//Borrar un producto
router.delete('/:id', productController.delete);

//Edición de un producto
//  1-Vista del formulario
router.get('/edit/:id', productController.edit);
//  2-Envío del formulario
router.put('/:id', upload.single('img'), validatorEdit, productController.editSend);//REVISAR VALIDATOR


module.exports = router