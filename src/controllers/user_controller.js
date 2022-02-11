const db = require('../database/models')
const bcrypt = require('bcryptjs')
const {validationResult}  = require('express-validator');

module.exports = {
    register: function(req,res) {
        res.render('users/register') 
    },

    registerSend: function(req,res) {
        // con erorres de credenciales
        const errores = validationResult(req)
        if (errores.errors.length > 0) {
            // con erorres de credenciales5
            return res.render(
                'users/register', 
                {
                    errors: errores.mapped(),
                    oldData: req.body
                }
            )
        } else {
            // sin errores de credenciales
            let nuevoUsuario = {
                ...req.body,
                avatar: req.file == undefined ? "default-user.png" : req.file.filename,
                password: bcrypt.hashSync(req.body.password,10),
                // automaticamente asigna el tipo de usuario 'pro' 
                type_id: 3
            }
            db.Usuarios.create(nuevoUsuario)
            .then(res.redirect('success'))
            .catch(error => console.log(error.message))
        }
    },

    login: function(req, res) {
        res.render('users/login')
    },

    loginSend: function(req, res) {
        // con erorres de credenciales
        const errores = validationResult(req)
        if (errores.errors.length > 0) {
            // con erorres de credenciales
            return res.render(
                'users/login', 
                {
                    errors: errores.mapped(),
                    oldData: req.body
                }
            )
        } else {
            // sin errores de credenciales
            db.Usuarios.findOne({
                where: {email: req.body.email}
            })
            .then(usuario => {
                // comprobar password
                if (bcrypt.compareSync(req.body.password, usuario.password) != undefined) {
                    return res.redirect('profile')
                }
                // email/password incorrectas
                return res.render(
                    'users/login', 
                    {errors: 
                        {
                            email: {msg: 'Las creendenciales son incorrectas'}, 
                            pass: {msg: 'Las creendenciales son incorrectas'}
                        } 
                    }
                )
            })
            .catch(error => console.log(error.message))
        }
    },

    userRegistered:function(req,res) {   
        res.render('users/success')
    }, 

    profile: function(req,res){
        res.render('users/userProfile', {usuario : req.session.usuarioLogueado})
    },

    logout: function(req, res) {
        res.clearCookie('recordarme');
        req.session.destroy();
        return res.redirect ('/');
    }
}