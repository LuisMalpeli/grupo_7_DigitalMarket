const fs = require('fs');
const path = require('path');
const Users = require('../models/Users')
const bcrypt = require('bcryptjs')
const {validationResult}  = require('express-validator')

const userController = {
    register: function(req, res) {
        res.render('users/register') 
    },
    registerSend : function(req,res) {   
        const errores = validationResult(req)
        if (errores.errors.length > 0) {
            return res.render('users/register', {errors: errores.mapped()})
        } else {
            let userCreate = {
                ...req.body,
                avatar: req.file == undefined ? "default-user.png" : req.file.filename,
                pass: bcrypt.hashSync(req.body.pass,10)
            }
            Users.create(userCreate)
            res.redirect('/')
        }
    },
    login: function(req, res) {
        res.render('users/login')
    }, 
    loginSend : function(req,res) {   
        const errores = validationResult(req)
        if (errores.errors.length > 0) {
            return res.render('users/login', {errors: errores.mapped()})
        } else {
            let userlogin = {
                ...req.body
            }
            console.log(userlogin)
            console.log(Users.login(userlogin))
            if (Users.login(userlogin)) {
                res.redirect('/')
            }
            res.render(
                'users/login', 
                {errors: 
                    {
                        email: {msg: 'Las creendenciales son incorrectas'}, 
                        pass: {msg: 'Las creendenciales son incorrectas'}
                    } 
                }
            )
        }
    }

}

module.exports = userController