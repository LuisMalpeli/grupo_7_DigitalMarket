const db = require('../database/models')
const bcrypt = require('bcryptjs')
const {validationResult}  = require('express-validator');
const path = require('path');

module.exports = {
    register: function(req,res) {
        res.render('users/register') 
    },

    registerSend: function(req,res) {
        // Inicia la variable errores almacenando el resultado de la validación de express-validator
        /*Errores validados:
            Nombre y Apellido:
                Obligatorio
                Al menos 2 caracteres
            Email:
                Obligatorio
                formato de e-mail válido
            Contraseña:
                Obligatorioa
                Al menos 8 caracteres
        */
        const errores = validationResult(req)
        if (errores.errors.length > 0) {
            // Si hay errores, retorna la vista con los errores y la data que completó el usuario
            return res.render(
                'users/register', 
                {
                    errors: errores.mapped(),
                    oldData: req.body
                }
            )
        } else {
            // Si express-validator no retorna con errores quedan chequear los parámetros no incluidos en express-validator
            // Valida que el campo de mail no exista en la base de datos (evita repetición)
            db.Usuarios.findOne({
                attributes:['email'],
                where: {email: req.body.email}
            })
            .then(usuario => {
                if (usuario){
                //Si se encuentra el usuario ((usuario)=True), retorna el formulario con el error correspondiente y la data completada por el usuario
                    return res.render(
                        'users/register', 
                        {errors: 
                            {
                                email: {msg: 'Ya existe un usuario registrado con este email. Por favor ingrese otro'}, 
                            },
                            oldData: req.body
                        }
                    )

                }
                return false //retorna false para salir de la promesa
            })
            .catch(error => console.log(error.message));
            //Validación de extensión de archivos para imágen
            let extensionesPermitidas = ['.png','.jpg','.jpeg','.gif']
            if(req.file !== undefined){
                //Si req.file no es undefined, quiere decir que hay un archivo adjunto
                //ext almacenará la extensión del archivo usando el índice 1 del split
                let ext = path.extname(req.file.originalname);
                let extValida = extensionesPermitidas.find(element => element == ext);
                if (!extValida) {
                    //Si extValida es undefined, quiere decir que la extensión no está permitida
                    return res.render(
                        'users/register', 
                        {errors: 
                            {
                                avatar: {msg: 'Los formatos permitidos para la imagen son .png, .jpg, .jpeg y .gif'}, 
                            },
                            oldData: req.body
                        }
                    )
                }
                
            }
            //Almacena los datos del usuario a crear en la variable nuevoUsuario
            let nuevoUsuario = {
                ...req.body,
                avatar: req.file == undefined ? "default-user.png" : req.file.filename,
                password: bcrypt.hashSync(req.body.password,10),
                // automaticamente asigna el tipo de usuario 'pro' 
                type_id: 3
            }
            db.Usuarios.create(nuevoUsuario)
            .then(
                 res.redirect('success')
            )
            .catch(error => console.log(error.message))
        }
    },

    login: function(req, res) {
        res.render('users/login')
    },

    loginSend: function(req, res) {
        // validar credenciales
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
                if (bcrypt.compareSync(req.body.password, usuario.password)) {
                    // cookies
                    usuario.password = "Creiste que encontraste algo?"
                    req.session.usuarioLogueado = usuario
                    if (req.body.recordarme != undefined) {
                        res.cookie('recordarme',usuario.email,{maxAge:1000*60*5})//(1000*60 = 1 min)
                    }
                    // envia a perfil
                    res.redirect('profile')
                } else {
                    // email-password incorrectas
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
            })
            .catch(error => console.log(error.message))
        }
    },

    userRegistered:function(req,res) {   
        res.render('users/success')
    }, 

    profile: function(req,res){
        db.Usuarios.findOne({
            where: {email: req.session.usuarioLogueado.email}
        })
        .then(usuario => {
            res.render('users/userProfile', {usuario : usuario})
        })
        .catch(error => console.log(error.message))
        
    },

    logout: function(req, res) {
        res.clearCookie('recordarme');
        req.session.destroy();
        return res.redirect ('/');
    }
}