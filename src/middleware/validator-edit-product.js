const {check} = require('express-validator') // se pide el modulo EV y haciendo uso de la desectructuración pedir el metodo check.
// validación para creación de producto
module.exports = [
    //Validar Products EDIT
    check('title')
        .notEmpty().withMessage('* Debe completar el campo titulo ').bail()
        .isLength({min:3, max:70}).withMessage('* El titulo debe tener un minimo de 3 caracteres y maximo de 70')
    ,
    check('description')
        .notEmpty().withMessage('* Debe completar el campo descripcion').bail()
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
    ,
    check('discount')
        .isInt({min:0,max:100}).withMessage('* El descuento debe estar entre 0 y 100').bail()
]