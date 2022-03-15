const db = require('../database/models')
const Sequelize = require("sequelize");

var url = 'http://localhost:3000/api'

module.exports = {
    userList: (req,res) => {
        db.Usuarios.findAll(
            {
            include: {
                model:db.UserTypes,
                as: 'user_type'
            }
            /* attributes: ['id','fullName','email'] */
            }
        )
        .then(users => {
            return res.json({
                count: users.length,
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
    userTypeUpdate:(req, res) => {
        console.log(req.body)
        let userToUpdate = {
            email:req.body.email,
            type_id:req.body.type_id
        }
        db.Usuarios.update(userToUpdate,{
            where:{email:userToUpdate.email}
        })
    },
    productList: (req,res) => {
        db.Productos.findAll(
            /* ({
            attributes: ['id','title','description']
            }) */
        )
        .then(products => {
            // CountByCategories (?)
            let aux = []
            db.Categorias.findAll()
            .then(categories => {
                Array.from(categories).forEach(elemento => {
                    aux[elemento.id] = 0
                })

                console.log(aux)
            })
            
            // fin CountByCategories (?)

            let datos = {
                count: products.length,
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
        .then(res.redirect('/'))
    },
    productUpdate: (req,res) => {
        let productToUpdate = {
            title:req.body.title,
            description:req.body.description,
            model:req.body.model,
            img:req.body.img,
            price:Number.parseInt(req.body.price),
        }

        db.Productos.update(productToUpdate,
        {
            where: {id: req.params.id}
        })
        .then(res.redirect('/'))
    }, 
    productDelete:(req,res) => {
        db.Productos.destroy({
            where: {id: req.params.id}
        })
        .then((response) => {
            return res.json(response)
        })
    },
    categoriesList:(req,res) => {
        db.Categorias.findAll()
        .then(categories => {
            return res.json({
                count: categories.length,
                data: Array.from(categories)
            })
        })
        .catch(error => console.log(error.message))
    },
    userCategoriesList:(req, res) => {
        db.UserTypes.findAll()
        .then(categories => {
            return res.json({
                count: categories.length,
                data: Array.from(categories)
            })
        })
        .catch(error => console.log(error.message))
    }
}