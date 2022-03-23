const express = require('express')
const router = express.Router();
const mainController = require('../controllers/main_controller')

router.get('/', mainController.index); //  res.render('index', {productos: products}) con los productos
router.get('/login', mainController.login);//res.render('login') par ver el formulario de inicio de sesión
router.get('/register', mainController.register);//res.render('register')
// mainRuter hace pedidos por GET a las paginas que me renderizan a index,login y register.
module.exports = router;