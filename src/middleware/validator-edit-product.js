const {check} = require('express-validator')

module.exports = [
    //Validar Products EDIT
    check('titulo')
        .notEmpty().withMessage('* Debe completar el campo titulo ').bail()
        .isLength({min:3, max:30}).withMessage('* El titulo debe tener un minimo de 3 caracteres y maximo de 30')
    ,
    check('descripcion')
        .notEmpty().withMessage('* Debe completar el campo descripcion').bail()
    ,
    check('marca')
        .notEmpty().withMessage('* Debe completar el campo marca').bail()
    ,
    check('modelo')
        .notEmpty().withMessage('* Debe completar el campo modelo').bail()
    ,
    check('tipo')
        .notEmpty().withMessage('* Debe completar el campo tipo (categoria)').bail()
    ,
    check('moneda')
        .notEmpty().withMessage('* Debe seleccionar una moneda').bail()
    ,
    check('precio')
        .notEmpty().withMessage('* Debe completar el campo precio').bail()
    ,
    check('descuento')
        .isInt({min:0,max:100}).withMessage('* El descuento debe estar entre 0 y 100').bail()
]