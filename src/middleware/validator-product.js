const {check} = require('express-validator')

module.exports = [
    //Validar Products CREATE
    check('title')
        .notEmpty().withMessage('* Debe completar el campo titulo ').bail()
        .isLength({min:5, max:70}).withMessage('* El titulo debe tener un minimo de 5 caracteres y maximo de 70')
    ,
    check('description')
        .notEmpty().withMessage('* Debe completar el campo descripcion').bail()
        .isLength({min:20, max:2500}).withMessage('* La descripción debe tener un mínimo de 5 caracteres y un máximo de 2500')
    ,
    // check('marca')
    //     .notEmpty().withMessage('* Debe completar el campo marca').bail()
    // ,
    check('model')
        .notEmpty().withMessage('* Debe completar el campo modelo').bail()
    ,
    check('product_type')
        .notEmpty().withMessage('* Debe completar el campo tipo (categoria)').bail()
    ,
    check('currency')
        .notEmpty().withMessage('* Debe seleccionar una moneda').bail()
    ,
    check('price')
        .notEmpty().withMessage('* Debe completar el campo precio').bail()
]