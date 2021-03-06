const db = require('../database/models');
const bcrypt = require('bcryptjs');
const {validationResult}  = require('express-validator');
const extValidator = require('../helpers/extensionValidator')
const fs = require('fs')


// realiza las validaciones correspondientes y manda a la vista res. render o redirect y('...').
module.exports = {
    register: function(req,res) {
        res.render('users/register') 
    },

    registerSend: function(req,res) {
        function registerErrors(err){
            //Esta función se encarga de renderizar el formulario de register con los errores recibidos en la variable err
            res.render(
                'users/register', 
                {
                    errors: err,
                    oldData: req.body
                }
            )
        }
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
            //Borra la imagen que multer genera
            if (req.file !== undefined) {
                //El usuario subió una imagen, pero hay que borrarla
                fs.unlink(req.file.path,(error) => {
                    if (error) {
                        console.error(error)
                        return
                    }
                })
            }
            return registerErrors(errores.mapped())
            
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
                    return registerErrors({email: {msg: 'Ya existe un usuario registrado con este email. Por favor ingrese otro'}})
                }
                if(extValidator.errorMsg !== null) {
                    //extValidator.errorMsg tendrá el mensaje de error resultante de la validación de multer
                    //Si tiene null quiere decir que el archivo es válido
                    return registerErrors({avatar: {msg: extValidator.errorMsg}})
                }
                //----------------Si no hay errores, almacena los datos del usuario a crear en la variable nuevoUsuario---------//
                let nuevoUsuario = {
                    ...req.body,
                    avatar: req.file == undefined ? "default-user.png" : req.file.filename,
                    password: bcrypt.hashSync(req.body.password,10),
                    // automaticamente asigna el tipo de usuario 'user' 
                    type_id: 2
                }
                if(nuevoUsuario){
                //---------------------------------Si el nuevoUsuario fue creado, entonces incuirlo en la BBDD------------------------//
                    db.Usuarios.create(nuevoUsuario)
                    .then(
                        res.redirect('success')
                    )
                    .catch(error => console.log(error.message))
                }
            })
            .catch(error => console.log(error.message));
            
        }
    },

    login: function(req, res) {
        res.render('users/login')
    },

    loginSend: function(req, res) {
        function registerErrors(err){
            //Esta función se encarga de renderizar el formulario de register con los errores recibidos en la variable err
            res.render(
                'users/login', 
                {
                    errors: err,
                    oldData: req.body
                }
            )
        }
        // validar credenciales
        const errores = validationResult(req)
        if (errores.errors.length > 0) {
            // con erorres de credenciales
            return registerErrors(errores.mapped())
        } else {
            // sin errores de credenciales
            db.Usuarios.findOne({
                where: {email: req.body.email}
            })
            .then(usuario => {
                // comprobar password
                if (usuario){
                    if (bcrypt.compareSync(req.body.password, usuario.password)) {
                        //-------------------------------cookies bcrypt--------------------------------------------------//
                        usuario.password = "Creiste que encontraste algo?"
                        req.session.usuarioLogueado = usuario
                        if (req.body.recordarme != undefined) {
                            res.cookie('recordarme',usuario.email,{maxAge:1000*60*5})//(1000*60 = 1 min)
                        }
                        // envia a perfil
                        res.redirect('profile')
                    } else {
                        return registerErrors({
                            email: {msg: 'Las creendenciales son incorrectas'}, 
                            password: {msg: 'Las creendenciales son incorrectas'}
                        })
                    }   
                } else {
                    // email-password incorrectas
                    return registerErrors({
                        email: {msg: 'Las creendenciales son incorrectas'}, 
                        password: {msg: 'Las creendenciales son incorrectas'}
                    })
                    
                }
            })
            .catch(error => console.log(error.message))
        }
    },
//--------- usuario registrado---------//
    userRegistered:function(req,res) {   
        res.render('users/success')
    }, 
// ---------perfil de usuario logueado------//
    profile: function(req,res){
        db.Usuarios.findOne({
            where: {email: req.session.usuarioLogueado.email}
        })
        .then(usuario => {
            res.render('users/userProfile', {usuario : usuario})
        })
        .catch(error => console.log(error.message))
        
    },
// ------ salgo de mi perfil, borra la cookie y destruye seseion para redireccionar al home-------//
    logout: function(req, res) {
        res.clearCookie('recordarme');
        req.session.destroy();// destruye la sesion
        return res.redirect ('/');// renderiza el home 
    }
};