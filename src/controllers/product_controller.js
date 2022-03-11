const { validationResult } = require('express-validator')
const fs = require('fs')
const db = require('../database/models')
const Sequelize = require("sequelize");
const Op = Sequelize.Op;


module.exports = {
    list: (req,res) => {
        // busqueda con query
        if (req.query.search != undefined) {
            db.Productos.findAll({
                where: {
                    [Op.or] : {
                        title: {[Op.like]: '%' + req.query.search + '%'},
                        description: {[Op.like]: '%' + req.query.search + '%'},
                        model: {[Op.like]: '%' + req.query.search + '%'}
                    }
                }
            })
            .then(producto => {
                res.render(
                    'products/products',
                    {productos: producto}
                )
            })
            .catch(error => console.log(error.message))
        } else {
            // mostrar todos los productos
            db.Productos.findAll({
                //include: [{association: 'categoria', association: 'marca', association: 'creador'}]
            })
            .then(producto => {
                res.render(
                    'products/products',
                    {productos: producto}
                )
            })
            .catch(error => {
                console.log(error.message)
                res.send('error :' + error.message)
            })
        }
    },
    detail: (req,res) => {
        db.Productos.findByPk(req.params.id)
        .then(producto => {
            res.render(
                'products/productDetail',
               {productos: producto}
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
        const errores = validationResult(req)
        if (errores.errors.length > 0) {
            return res.render('products/productCreate', {errors: errores.mapped()})
        } else {
            let nuevoProducto = {
                title: req.body.title,
                description: req.body.description,
                model: req.body.model,
                product_type: req.body.product_type,
                currency: req.body.currency,
                price: req.body.price,
                img: req.file == undefined ? "fff.jpg" : req.file.filename,
            }
            db.Productos.create(nuevoProducto)
            .then(
                res.redirect('/')
            )
            .catch(error => console.log(error.message))
        }
    },
    edit: (req, res) => {
        db.Productos.findByPk(req.params.id)
        .then(producto => {
            res.render(
                'products/productEdit', 
                {productos: producto}
            )
        })
        .catch(error => console.log(error));
		
	},
    editSend:function(req,res) {
        const errores = validationResult(req)
        if (errores.errors.length > 0) {
            //Borra la imagen que multer genera
            if (req.file !== undefined) {
                fs.unlink(req.file.path,(error) => {
                    if (error) {
                        console.error(error)
                        return
                    }
                })
            }
            return res.render(
                'products/productEdit', 
                {
                    errors: errores.mapped(), 
                    productos: req.body
                    /* {
                        //id: Number.parseInt(req.params.id),
                    ...req.body
                    } */
                }
            )
        } else {
             // editar producto
             let productToUpdate = {
                ...req.body,
                has_discount:req.body.has_discount == 0 ? false : true,
                discount:Number.parseInt(req.body.discount),
                price:Number.parseInt(req.body.price),
             }
             if (req.file !== undefined) {
                 productToUpdate.img = req.file.filename
             }

            db.Productos.update(
                productToUpdate,
                {
                    where: {
                    id: req.params.id
                }
           })
           .then(res.redirect('/'))
            .catch(error=>{console.log(error.message)})
        }
    },
    delete:function(req,res) {
        db.Productos.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(res.redirect('/'))
    },
}