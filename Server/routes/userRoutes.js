const express= require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyToken = require('../middleware/verifyToken');

router.get('/users', userController.displayUsers);

router.use(verifyToken);

router.get('/profile', userController.displayProfile);
router.patch('/:id', userController.editProfile);
//router.post('/', userController.createUser);


module.exports = router;