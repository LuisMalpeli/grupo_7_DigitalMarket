const db = require('../database/models');

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
}; // se ve un método por cada una de las rutas mencionadas.

module.exports = mainController;