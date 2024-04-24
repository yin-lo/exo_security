const express = require('express');
const mainController = require('../controllers/main');
const userController = require('../controllers/user');

const router = express.Router();

router.get('/login', userController.loginPage);
router.post('/login', userController.loginAction);
router.get('/signup', userController.signupPage);
router.post('/signup', userController.signupAction);
router.get('/', mainController.page);
router.get('/:path', mainController.page);


module.exports = router;