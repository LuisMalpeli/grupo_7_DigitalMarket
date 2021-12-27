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
            return res.render('users/register', {
                errors: errores.mapped(),
                oldData: req.body
            })
        } else {
            let userCreate = {
                ...req.body,
                avatar: req.file == undefined ? "default-user.png" : req.file.filename,
                pass: bcrypt.hashSync(req.body.pass,10)
            }
            Users.create(userCreate)
            
            res.redirect('success')
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
            //No hay errores en el form de login
            let userLogin = {
                ...req.body
            }
            //Users.login valida las credenciales del usuario y retorna true
            if (Users.login(userLogin)) {
                //Busca la información del usuario y la almacena en session
                req.session.usuarioLogueado = Users.findByField("email",userLogin.email)
                //creación de cookie de usuario
                if(userLogin.recordarme != undefined) {
                    //Si el usuario chequeó la casilla de Recordar Usuario, crea la cookie con el usuario
                    res.cookie('recordarme',userLogin.email,{maxAge:1000*60*5})//(1000*60 = 1 min)
                }
                
                return res.redirect('profile')
            }
            //Si las credenciales son incorrectas
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
    },
    userRegistered:function(req,res) {   
        res.render('users/success')
    },    
    profile: function(req,res){
        res.render('users/userProfile')
    },
    logout: function(req, res) {
        res.clearCookie('recordarme');
        req.session.destroy();
        return res.redirect ('/');

    }

}

module.exports = userController