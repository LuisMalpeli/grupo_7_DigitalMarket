const express = require('express')
const router = express.Router();
const productController = require('../controllers/product_controller');
const upload = require('../middleware/multer');
const validatorCreate = require('../middleware/validator-product')
const validatorEdit = require('../middleware/validator-edit-product')



//Capturo lo que venga a products y le muestro la lista de productos completa, barra de busqueda del header.ejs
router.get('/', productController.list);

//Creación de un producto:


//  1-Vista del formulario de productos a crear
router.get('/create', productController.create); //Mostrar el formulario para crear el producto a la vista =>GET

//  2-Envío del formulario ya creado de productos
router.post('/create', upload.single('img'), validatorCreate, productController.createSend); //ruta que procesa la informacion del formulario => POST
//Mostrar el formulario, primero hace la validacion multer= const upload, y luego la segunda validacion en el controador(createSend). single('img')indica subir el archivo con nombre img que coincide con el atributo del input del formulario.


router.get('/cart', productController.cart);

//Muestra el detalle de 1 producto
router.get('/:id', productController.detail);

//Borrar un producto
router.delete('/:id', productController.delete);

//Edición de un producto, manejando peticion PUT
//  1-Vista del formulario enviada a la vista por GET
router.get('/edit/:id', productController.edit);
//  2-Envío del formulario que es procesado por PUT que usa multer single(un archivo)
router.put('/:id', upload.single('img'), validatorEdit, productController.editSend);

//Agregar un producto al carrito
router.post('/addToCart/:id',productController.addtoCart)
//eliminar un producto del carrito
router.get('/deleteFromCart/:id', productController.deleteFromCart) // o DELETE para que sea más seguro

module.exports = router;