var express = require('express');
var router = express.Router();

var apiController = require('../controllers/ApiController');
var loginController = require('../controllers/LoginController');
var userController = require('../controllers/UserController');

router.get('/', apiController.apiRequest);

router.get('/user', userController.find);
router.delete('/user/:id', userController.delete);
router.patch('/user/password/:id', userController.changePassword);
router.post('/register', userController.register);

router.post('/login', loginController.login);

module.exports = router;
