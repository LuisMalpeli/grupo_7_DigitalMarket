const db = require('../database/models')

const mainController = {
    index : (req,res) => {
        db.Producto.findAll()
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
    }
}

module.exports = mainController