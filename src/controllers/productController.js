const fs = require('fs');
const path = require('path');
const upload = require('../middleware/multer');

const productsFilePath = path.join(__dirname, '../db/products.json');
const productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const productController = {
    main: function(req, res) {
        res.render(
            'products/products',
            {productos: productos}
            )
    },
    detail: function(req, res) {
        let productoAMostrar = productos.find(element=> element.id == req.params.id)
        res.render(
            'products/productDetail',
            {productos: productoAMostrar}
        ) //Dentro de la carpeta products, busca product Detail

    },
    cart: function(req, res) {
        res.render('products/productCart')
    },
    create: function(req,res) {
        //Muestra el formulario de creación de producto
        res.render('products/productCreate')
    },
    createSend:function(req,res) {
        //Crea un producto y lo agrega a la base de datos JSON
        
        res.send('envio de formulario de creación de producto');//Placeholder
        //Insertar lógica de creación y validación del formulario acá
    },

    edit: (req, res) => {
		//Pido el parámetro que viene en la url bajo el nombre id
		let idProducto = req.params.id
		//encuentro el producto particular que me coincide con el id que quiero mostrar
		let productoAMostrar = productos.find(element => element.id == idProducto)
		//Paso el producto que encontré al ejs
		res.render('products/productEdit',{productos: productoAMostrar});
	},
    editSend:function(req,res) {
        let id = req.params.id
        let newProduct = {
			id:id,
			...req.body,
            enPromocion:req.body.enPromocion == 0 ? false : true,
            descuento:Number.parseInt(req.body.descuento)/100,
            precio:Number.parseInt(req.body.precio)

			//img: req.file == undefined ? "default-image.png": req.file.filename
		}
        res.send(newProduct)
    },
    delete:function(req,res) {
        res.send('Envío del formulario eliminación de un producto')
    },
}

module.exports = productController