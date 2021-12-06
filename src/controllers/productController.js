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
    productDetail: function(req, res) {
        res.render('products/productDetail') //Dentro de la carpeta products, busca product Detail
    },
    productCart: function(req, res) {
        res.render('products/productCart')
    },
    productCreate: function(req,res) {
        res.render('products/productCreate')
    },
    productEdit: function(req,res) {
        res.render('products/productEdit')
    },
}

module.exports = productController