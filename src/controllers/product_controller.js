const { validationResult } = require('express-validator');
const fs = require('fs');
const db = require('../database/models');
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

// el método del controlador de productos me da como resultado final un res render o res redirect u db. producto
module.exports = {
    list: (req,res) => {
        // busqueda con query(barra de busqueda del header)
        if (req.query.search != undefined) {
            db.Productos.findAll({
                where: {         // aca el where filtra la consulta
                    [Op.or] : {  // op.or qué es ?  // (someAttribute = 5) OR (someAttribute = 6)
                        title: {[Op.like]: '%' + req.query.search + '%'},
                        description: {[Op.like]: '%' + req.query.search + '%'},   //[Op.like]: '%hat',      // LIKE '%hat'
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
    addtoCart:(req, res) => {
        db.Productos.findByPk(req.params.id)
        .then(producto => {
            let productToCart = {
                product_id: producto.id,
                user_id: 1 //Por ahora crea por default todos los productos bajo el usuario nro 1
            }
            db.Carrito.create(productToCart)
            .then(res.redirect('/products/cart'))
            .catch(error => console.log(error.message))
        })
        .catch(error => console.log(error.message))
    },
    deleteFromCart:(req, res) =>{
        db.Carrito.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(res.redirect('/products/cart'))
        .catch(error => console.log(error.message))
    },
    cart: (req, res) => {
        db.Carrito.findAll({
            include: {
                model: db.Productos,
                as: 'productoDelCarrito'
            }
        })
        .then(itemsDelCarrito => {
            let productosParaLaVista = [] //Inicializa el array de productos que se pasará a la vista
            itemsDelCarrito.forEach(item => {
                productosParaLaVista.push(
                    //Este objeto normaliza los nombres que resultan de la query a la BBDD para manejarlos en la vista
                    {
                    title: item.productoDelCarrito.title,
                    img: item.productoDelCarrito.img,
                    price: item.productoDelCarrito.price,
                    has_discount: item.productoDelCarrito.has_discount,
                    discount: item.productoDelCarrito.discount,
                    cartId: item.id
                    }
                )
            })
            let costoEnvio = 500
            let productsTotal = 0 // Inica la variable que calcula el precio total de los productos del carrito
            let totalCarrito = 0
            productosParaLaVista.forEach(producto => {
                if (producto.has_discount == 1) {
                    //Si el producto tiene descuento, agrega el precio descontado
                    productsTotal += producto.price * (producto.discount/100)
                } else {
                    productsTotal += producto.price // Agrega el precio del producto al carrito
                }
            })
            if (productosParaLaVista.length > 0) {
                totalCarrito = productsTotal + costoEnvio
            }
            res.render(
                'products/cart',
                {
                    cart: productosParaLaVista,
                    costoEnvio: costoEnvio,
                    precioTotal: totalCarrito,
                }
                );
        })
    },
    create: (req,res) => {
        res.render('products/productCreate')
    },
    createSend: (req,res) => {
        const errores = validationResult(req)/// se ejecuta la validacion yel controlador recibe toda la validacion a travez del validatorResult 
        if (errores.errors.length > 0) {
            return res.render(
                'products/productCreate',
                {
                    errors: errores.mapped(),// si tenien errores envia los errores mapeados al front
                    productos: req.body
                
                })
        } else {// si no empieza a mapear con los datos que me vienen del request del body y su atributo.
            let nuevoProducto = {
                title: req.body.title,
                description: req.body.description,
                model: req.body.model,
                product_type: req.body.product_type,
                currency: req.body.currency,
                price: req.body.price,
                img: req.file == undefined ? 'default-product.png' : req.file.filename
            }

            db.Productos.create(nuevoProducto)//graba el registro en la ddbb , se crea el nuevo producto con lo mapeado y redirecciona a la pagina principal
            .then(
                res.redirect('/')
            )
            .catch(error => console.log(error.message))// manda algun error en la comunicacion( ej: 400 error de negocio o en la gama d elos 500 cuando es un erro propio del servidor, no esta disponible)
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
};