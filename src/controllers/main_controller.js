const db = require('../database/models')

const mainController = {
    index : (req,res) => {
        db.Productos.findAll()
        .then(products => {
            res.render('index', {productos: products})
        })
        .catch(error => console.log(error))
    },
    login: function(req, res) {
        res.render('login')
    },
    register: function(req, res) {
        res.render('register')
    }
}

module.exports = mainController