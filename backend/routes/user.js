const express = require('express');

const userController = require('../controllers/user');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
// const max = require('../middleware/limiter');

const router = express.Router();

router.post('/signup', userController.signup);
router.post('/login', userController.login);
// router.post('/login', max.limit, userController.login);

router.get('/profile', auth, userController.getProfile);
router.put('/profile', auth, multer, userController.updateProfile);
router.delete('/profile', auth, userController.deleteProfile);

module.exports = router;
