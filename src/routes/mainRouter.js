const express = require('express')
const router = express.Router();
const mainController = require('../controllers/main_controller')

router.get('/', mainController.index);
router.get('/login', mainController.login);
router.get('/register', mainController.register);
// mainRuter hace pedidos por GET a las paginas que me renderizan a index,login y register.
module.exports = router;