const express= require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const verifyToken = require('../middleware/verifyToken'); //middleware
const fileUpload = require('../middleware/fileUpload');

router.get('/', postController.displayAllPosts);

router.use(verifyToken);

router.get('/:id', postController.displayPost);
router.get('/myposts', postController.displayAllUserPosts);
router.patch('/:id', postController.editPost);
router.patch('/comment/:id', postController.commentpost);
router.delete('/:id', postController.deletePost);
router.post('/newpost',fileUpload, postController.createPost);


module.exports = router;