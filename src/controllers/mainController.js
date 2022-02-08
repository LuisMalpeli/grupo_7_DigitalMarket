const fs = require('fs');
const path = require('path');
const db = require('../database/models')

const productsFilePath = path.join(__dirname, '../db/products-data/products.json');
const productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const Products = db.Producto

const mainController = {
    index: function(req, res) {
        res.render(
            'index',
            {productos: productos}
        )  
    },
    login: function(req, res) {
        res.render('login')
    },
    register: function(req, res) {
        res.render('register')
    },

}

module.exports = mainController;