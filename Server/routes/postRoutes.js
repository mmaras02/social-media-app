const express= require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const verifyToken = require('../middleware/verifyToken'); //middleware
const fileUpload = require('../middleware/fileUpload');
const Post = require('../models/PostModel');

router.get('/', postController.displayAllPosts);

//middleware has to apply to all routes 
router.use(verifyToken);

router.get('/:id', postController.displayPost);
router.get('/myposts', postController.displayAllUserPosts);
router.patch('/:id', postController.editPost);
router.delete('/:id', postController.deletePost);
router.use(fileUpload);
router.post('/newpost', postController.createPost);


module.exports = router;


/*router.post("/add",upload.single("image"), (req, res) => {
    const newPost = new Post({
        userId:req.body._id,
        description: req.body.description,
        image:req.file.image
    });
    newPost.save()
    .then(()=>res.json('new post posted'))
    .catch((err)=> res.status(400).josn(err));
})*/