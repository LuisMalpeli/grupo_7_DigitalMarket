const express = require('express')
const router = express.Router();
const userController = require('../controllers/userController')
const upload = require('../middleware/multer');
const validatorReg = require('../middleware/validator-users')
const validatorLogin = require('../middleware/validator-login')

//Registro de usuario
router.get('/register', userController.register)
router.post('/register', upload.single('avatar'), validatorReg, userController.registerSend)

//Login de usuario
router.get('/login', userController.login)
router.post('/login', validatorLogin, userController.loginSend)

module.exports = router