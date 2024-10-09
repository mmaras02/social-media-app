const express= require('express');
const router = express.Router();
const userAuthController = require('../controllers/userAuthController');

router.post('/login', userAuthController.loginUser);
router.post('/register', userAuthController.registerUser);

module.exports = router;