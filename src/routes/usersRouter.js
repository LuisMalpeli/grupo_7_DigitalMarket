const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const upload = require('../middleware/multer');
const validatorReg = require('../middleware/validator-users');
const validatorLogin = require('../middleware/validator-login');
const guestMiddleware = require('../middleware/guestMiddleware');
const loggedMiddleware = require('../middleware/loggedMiddleware');

//Registro de usuario
router.get('/register', guestMiddleware, userController.register);
router.post('/register', upload.single('avatar'), validatorReg, userController.registerSend);

//Login de usuario
router.get('/login', guestMiddleware, userController.login);
router.post('/login', validatorLogin, userController.loginSend);

router.get('/success', guestMiddleware, userController.userRegistered);

router.get('/profile', loggedMiddleware, userController.profile);

router.get('/logout', loggedMiddleware, userController.logout);
module.exports = router