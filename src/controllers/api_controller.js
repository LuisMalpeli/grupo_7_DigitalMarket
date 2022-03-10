const db = require('../database/models')
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports = {
    userList: (req,res) => {
        db.Usuarios.findAll()
        .then(users => {
            return res.json({
                count: users.lenght,
                // countByCategory ---> no entendi que quiere que haga
                users: Array.from(users)
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
        
    },
    productList: (req,res) => {
        db.Productos.findAll()
        .then(products => {
            return res.json({
                count: products.lenght,
                // countByCategory ---> no entendi que quiere que haga
                products: Array.from(products)
            })
        })
    },
    productId: (req,res) => {
        db.Productos.findByPk(req.params.id)
        .then(product => {
            return res.json(product)
        })
    },
    productDelete:(req,res) => {

    },
}