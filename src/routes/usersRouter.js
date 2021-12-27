const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const upload = require('../middleware/multer');
const validatorReg = require('../middleware/validator-users');
const validatorLogin = require('../middleware/validator-login');
const guestMiddleware = require('../middleware/guestMiddleware');

//Registro de usuario
router.get('/register', guestMiddleware, userController.register);
router.post('/register', upload.single('avatar'), validatorReg, userController.registerSend);

//Login de usuario
router.get('/login', guestMiddleware, userController.login);
router.post('/login', validatorLogin, userController.loginSend);

router.get('/success', userController.userRegistered);

router.get('/profile',userController.profile);

router.get('/logout', userController.logout);
module.exports = router