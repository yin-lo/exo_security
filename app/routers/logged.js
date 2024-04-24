const express = require('express');
const commentControler = require('../controllers/comment');
const userController = require('../controllers/user');

const router = express.Router();

router.get('/golden-book', commentControler.all);
router.post('/golden-book', commentControler.add);
router.get('/disconnect', userController.disconnect);

module.exports = router;