
const productController = {
    productDetail: function(req, res) {
        res.render('products/productDetail') //Dentro de la carpeta products, busca product Detail
    },
    productCart: function(req, res) {
        res.render('products/productCart')
    }

}

module.exports = productController