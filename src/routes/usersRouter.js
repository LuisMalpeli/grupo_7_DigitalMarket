const express = require('express')
const router = express.Router();
const userController = require('../controllers/userController')
const upload = require('../middleware/multer');
const validator = require('../middleware/validator-users')

//Registro de usuario
router.get('/register', userController.register)
router.post('/register', upload.single('avatar'), validator, userController.registerSend)

//Login de usuario
router.get('/login', userController.login)
router.post('/login', validator, userController.loginSend)

module.exports = router