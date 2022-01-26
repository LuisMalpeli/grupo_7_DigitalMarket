const {check} = require('express-validator')

module.exports = [
    //Validar Users
    check('userName')
        .notEmpty().withMessage('Debe completar el campo usuario').bail()
        .isLength({min:5, max:20}).withMessage('El usuario debe tener un minimo de 5 caracteres y maximo de 20'),
    check('fullName')
        .notEmpty().withMessage('Debe completar el campo nombre y apellido').bail()
        .isLength({min:8, max:30}).withMessage('El usuario debe tener un minimo de 8 caracteres y maximo de 30'),
    check('gender')
        .notEmpty().withMessage('Debe elegir un genero'),
    check('email')
        .notEmpty().withMessage('Debe completar el campo email').bail()
        .isEmail().withMessage('Ingrese un email valido'),
    check('pass')
        .notEmpty().withMessage('Debe completar el campo contraseña').bail()
        .isLength({min:6, max:10}).withMessage('La contraseña debe tener un minimo de 6 caracteres y maximo de 10'),
    ]