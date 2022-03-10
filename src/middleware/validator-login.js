const {check} = require('express-validator')

module.exports = [
    check('email')
        .notEmpty().withMessage('Debe completar el campo email').bail()
        .isEmail().withMessage('Ingrese un email valido'),
    check('password')
        .notEmpty().withMessage('Debe completar el campo contraseña').bail(),
]