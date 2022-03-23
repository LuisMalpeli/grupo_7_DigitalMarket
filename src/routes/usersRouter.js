const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');
const upload = require('../middleware/multer');
const validatorReg = require('../middleware/validator-users');
const validatorLogin = require('../middleware/validator-login');
const guestMiddleware = require('../middleware/guestMiddleware');
const loggedMiddleware = require('../middleware/loggedMiddleware');

//Registro de usuario
router.get('/register', guestMiddleware, userController.register);//res.render('users/register') 
router.post('/register', upload.single('avatar'), validatorReg, userController.registerSend);//res.redirect('success') y db.Usuarios.create(nuevoUsuario).

//Login de usuario
router.get('/login', guestMiddleware, userController.login); // manda al registro de usuario =>  res.render('users/login')

router.post('/login', validatorLogin, userController.loginSend);// envia los datos ingresados en el registro a la base de datos y res.render('users/login')
    

router.get('/success', guestMiddleware, userController.userRegistered); // manda a la página éxito? =>res.render('users/success')

router.get('/profile', loggedMiddleware, userController.profile);//manda al perfil del usuario => res.render('users/userProfile', {usuario : usuario})

router.get('/logout', loggedMiddleware, userController.logout);// cierre de seccion =>return res.redirect ('/')

module.exports = router;