const {check} = require('express-validator')
// validación para creación de usuario
module.exports = [
    //Validar Users
    check('userName')
        .notEmpty().withMessage('Debe completar el campo usuario').bail()
        .isLength({min:5, max:20}).withMessage('El usuario debe tener un minimo de 5 caracteres y maximo de 20'),
    check('fullName')
        .notEmpty().withMessage('Debe completar el campo nombre y apellido').bail() //Obligatorio
        .isLength({min:2}).withMessage('El nombre debe tener un minimo de 2 caracteres'), //Mínimo de 2 caracteres
    check('gender')
        .notEmpty().withMessage('Debe elegir un genero'),
    check('email')
        .notEmpty().withMessage('Debe completar el campo email').bail() //Obligatorio
        .isEmail().withMessage('Ingrese un email valido'), //Campo de mail válido
    check('password')
        .notEmpty().withMessage('Debe completar el campo contraseña').bail() //Obligatoria
        .isLength({min:8}).withMessage('La contraseña debe tener un mínimo de 8 caracteres'), //Al menos 8 caracteres
    ]