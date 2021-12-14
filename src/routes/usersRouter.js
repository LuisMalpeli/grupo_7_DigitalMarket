const express = require('express')
const router = express.Router();
const userController = require('../controllers/userController')
const upload = require('../middleware/multer');

//Registro de usuario
router.get('/register', userController.register)
router.post('/register', upload.single('avatar'), userController.registerSend)

//Login de usuario
router.get('/login', userController.login)

module.exports = router