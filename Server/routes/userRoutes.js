const express= require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyToken = require('../middleware/verifyToken');
const fileUpload = require('../middleware/fileUpload');

router.get('/users', userController.displayUsers);

router.use(verifyToken);

router.get('/profile', userController.displayProfile);
router.patch('/:id', fileUpload, userController.editProfile);


module.exports = router;