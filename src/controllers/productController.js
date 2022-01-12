const fs = require('fs');
const path = require('path');
const Products = require('../models/Products')
const {validationResult}  = require('express-validator')

const productsFilePath = path.join(__dirname, '../db/products-data/products.json');
const productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const productController = {
    main: function(req, res) {
        res.render(
            'products/products',
            {productos: productos}
            )
    },
    detail: function(req, res) {
        let productoAMostrar = Products.findByPk(req.params.id)
        res.render(
            'products/productDetail',
            {productos: productoAMostrar}
        ) //Dentro de la carpeta products, busca product Detail

    },
    cart: function(req, res) {
        res.render('products/cart');
    },
    create: function(req,res) {
        //Muestra el formulario de creación de producto
        res.render('products/productCreate')
    },
    createSend:function(req,res) {
        //Crea un producto y lo agrega a la base de datos JSON
        const errores = validationResult(req)
        if (errores.errors.length > 0) {
            return res.render('products/productCreate', {errors: errores.mapped()})
        } else {
            let productToCreate = {
                ...req.body,
                precio: Number.parseInt(req.body.precio),
                enPromocion: false,
                descuento: 0,
                img: req.file == undefined ? "fff.jpg" : req.file.filename,
            };
            Products.create(productToCreate);
            res.redirect('/')
        }
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
        const errores = validationResult(req)
        let id = Number.parseInt(req.params.id)
        if (errores.errors.length > 0) {
            return res.render('products/productEdit', {errors: errores.mapped(), productos:{
                id: Number.parseInt(req.params.id),
                ...req.body}})
        } else {
            let newProduct = {
                id:id,
                ...req.body,
                enPromocion:req.body.enPromocion == 0 ? false : true,
                descuento:Number.parseInt(req.body.descuento),
                precio:Number.parseInt(req.body.precio),
                img: req.file != undefined ? req.file.filename : "fff.png"
		    }
            Products.edit(newProduct)
            res.redirect('/')
        }
    },
    delete:function(req,res) {
        Products.delete(req.params.id)
        res.send('Envío del formulario eliminación de un producto')
    },
}

module.exports = productController