const db = require('../database/models')
const Sequelize = require("sequelize");

var url = 'http://localhost:3000/api'

module.exports = {
    userList: (req,res) => {
        db.Usuarios.findAll({
            attributes: ['id','fullName','email']
        })
        .then(users => {
            return res.json({
                count: users.length,
                // countByCategory ---> no entendi que quiere que haga
                data: Array.from(users)
            })
        })
    },
    userId: (req,res) => {
        db.Usuarios.findByPk(req.params.id)
        .then(user => {
            return res.json(user)
        })
    },
    userDelete:(req,res) => {
        db.Usuarios.destroy({
            where: {id: req.params.id}
        })
        .then((response) => {
            return res.json(response)
        })
    },
    productList: (req,res) => {
        db.Productos.findAll(({
            attributes: ['id','title','description']
        }))
        .then(products => {
            let datos = {
                count: products.length,
                // countByCategory ---> no entendi que quiere que haga
                data: Array.from(products)
            }
            datos.data.forEach(elemento => {
                elemento.dataValues['detail'] = url + `/products/${elemento.id}`
            })
            return res.json(datos)
        })
    },
    productId: (req,res) => {
        db.Productos.findByPk(req.params.id)
        .then(product => {
            return res.json(product)
        })
    },
    productCreate: (req,res) => {
        db.Productos.create(req.body)
        .then(product => {
            return res.json({
                data: product,
                status: 'OK'
            })
        })
    },
    productUpdate: (req,res) => {
        db.Productos.update({
            id: req.params.id,
            ...req.body, 
            has_discount:req.body.has_discount == 0 ? false : true,
            discount:Number.parseInt(req.body.discount),
            price:Number.parseInt(req.body.price),
            img: req.file != undefined ? req.file.filename : "default-product.png" 
        },
        {
            where: {id: req.params.id}
        })
        .then(product => {
            return res.json(product)
        })
    },
    productDelete:(req,res) => {
        db.Productos.destroy({
            where: {id: req.params.id}
        })
        .then((response) => {
            return res.json(response)
        })
    },
}