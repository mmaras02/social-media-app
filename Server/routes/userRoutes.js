const express= require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const requireAuth = require('../middleware/requireAuth');

router.get('/users', userController.displayUsers);
router.use(requireAuth);
router.get('/profile', userController.displayProfile);
router.patch('/:id', userController.editProfile);
//router.post('/', userController.createUser);


module.exports = router;