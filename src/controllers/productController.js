const fs = require('fs');
const path = require('path');

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
        res.render('products/productCreate')
    },
    createSend:function(req,res) {
        res.send('envio de formulario de creación de producto');//Placeholder
        //Insertar lógica de creación y validación del formulario acá
    },
    edit: function(req,res) {
        res.render('products/productEdit')
    },
    editSend:function(req,res) {
        res.send('Envío del formulario de edición de producto')
    },
    delete:function(req,res) {
        res.send('Envío del formulario eliminación de un producto')
    },
}

module.exports = productController