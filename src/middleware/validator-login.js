const {check} = require('express-validator')

module.exports = [
    //Validar login
    check('email')
        .notEmpty().withMessage('Debe completar el campo email').bail()
        .isEmail().withMessage('Ingrese un email valido'),
    check('pass')
        .notEmpty().withMessage('Debe completar el campo contraseña').bail()
        .isLength({min:6, max:10}).withMessage('La contraseña debe tener un minimo de 6 caracteres y maximo de 10'),
    ]