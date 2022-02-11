const db = require('../database/models')

module.exports = {
    list: (req,res) => {
        db.Productos.findAll({
            include: [{association: 'categoria', association: 'marca', association: 'creador'}]
        })
        .then(producto => {
            res.render(
                'products/products',
                producto
            )
        })
        .catch(error => {
            console.log(error.message)
            res.send('error :' + error.message)
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
                img: req.body.img
                // created by - category type(product type?) - brand id
            }
            db.Producto.create(nuevoProducto)
            .then(
                res.redirect('/')
            )
        }
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
        const errores = validationResult(req)
        if (errores.errors.length > 0) {
            return res.render(
                'products/productEdit', 
                {
                    errors: errores.mapped(), 
                    productos:{
                        id: Number.parseInt(req.params.id),
                    ...req.body
                    }
                }
            )
        } else {
             // editar producto
            db.Producto.update()
            .then(
               {
                    id: req.params.id,
                    ...req.body,
                    has_discount:req.body.enPromocion == 0 ? false : true,
                    discount:Number.parseInt(req.body.descuento),
                    price:Number.parseInt(req.body.precio),
                    img: req.file != undefined ? req.file.filename : "default-product.png" 
               },
               {
                    where: {
                        id: req.params.id
                    }
               }
            )
            .catch(error=>{console.log(error.message)})
        }
    },
    delete:function(req,res) {
        db.Producto.destroy({
            where: {
                id: req.params.id
            }
        })
        res.send('Envío del formulario eliminación de un producto')
    },
}