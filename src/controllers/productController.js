
const productController = {
    productDetail: function(req, res) {
        res.render('products/productDetail') //Dentro de la carpeta products, busca product Detail
    },
    productCart: function(req, res) {
        res.render('products/productCart')
    },
    productCreate: function(req,res) {
        res.render('products/productCreate')
    },
    productEdit: function(req,res) {
        res.render('products/productEdit')
    },
}

module.exports = productController