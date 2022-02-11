const { Model } = require('sequelize/dist')
const db = require('../database/models')

const productController = {
    list: (req,res) => {
        db.Producto.findAll({
            include: [{association: 'categoria', association: 'marca', association: 'creador'}]
        })
        .then(producto => {
            res.render(
                'products/products',
                producto
            )
        })
    },
    detail: (req,res) => {
        db.Producto.findByPk(req.params.id)
        .then(producto => {
            res.render(
                'products/productDetail',
                producto
            )
        })
    },
    cart: (req, res) => {
        res.render('products/cart');
    },
    create: (req,res) => {
        res.render('products/productCreate')
    },
    createSend: (req,res) => {
        db.Producto.create({
            title: req.body.title,
            description: req.body.description,
            model: req.body.model,
            product_type: req.body.product_type,
            has_discount: req.body.has_discount,
            discount: req.body.discount,
            currency: req.body.currency,
            price: req.body.price,
            img: req.body.img,
        })
        .then(() => {
            return res.redirect('/')
        })
    },
    edit: (req, res) => {
        db.Producto.findByPk(req.params.id)
        .then(product => {
            res.render(
                'products/productEdit', 
                product
            )
        })
		
	},
    editSend:function(req,res) {
        
    },
    delete:function(req,res) {
        db.Producto.delete(req.params.id)
        res.send('Envío del formulario eliminación de un producto')
    },
}

module.exports = productController