const {check} = require('express-validator')

module.exports = [
    check('email')
        .notEmpty().withMessage('Debe completar el campo email').bail(),
    check('pass')
        .notEmpty().withMessage('Debe completar el campo contraseña').bail(),
]