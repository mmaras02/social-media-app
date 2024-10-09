const express= require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.get('/', postController.displayAllPosts);
router.get('/:id', postController.displayPost);
router.patch('/:id', postController.editPost);
router.delete('/:id', postController.deletePost);
router.post('/', postController.createPost);

module.exports = router;