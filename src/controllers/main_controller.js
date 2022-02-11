const db = require('../database/models')

const mainController = {
    index : (req,res) => {
        db.Productos.findAll()
        .then(products => {
            let respuesta = {
                meta: {
                    status : 200,
                    total: products.length,
                },
                data: products
            }
                res.json(respuesta);
        })
            //res.render('index', {productos: respuesta.data})
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