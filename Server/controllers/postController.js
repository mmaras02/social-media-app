const { default: mongoose } = require('mongoose');
const Post = require('../models/PostModel');
/*const multer = require('multer');


const storage = multer.diskStorage({
    //destination where we want to store images
    destination:(req, file, callback) => {
        const uploadPath = path.join(__dirname, '../../client/public/uploads/');
        callback(null, uploadPath);
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
})
const upload = multer({storage: storage}).single('image');*/

//create post
const createPost = async (req, res) => {
    const {userId, description} = req.body;
    console.log("body i received", userId,description);

    try{
        if (!req.file) {
            throw new Error("No image uploaded");
        }

        console.log("Received body", userId, description);
        console.log("File uploaded:", req.file);

        const post = await Post.create({userId, description, image:req.file.filename});
        res.status(200).json(post);

    } catch(error){
        res.status(400).json({error: error.message});
    }
}



//display all posts
const displayAllPosts = async (req, res) => {
    const post = await Post.find({}).sort({createdAt:-1});

    res.status(200).json(post);
}

const displayAllUserPosts = async (req, res) => {
    try{
        const userId = req.userId;
        const posts = await Post.find({userId}).sort({createdAt:-1});
        res.status(200).json(posts);
    } catch(error){
        res.status(400).json({error});
    }
}

//display one post
const displayPost = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such post'});
    }
    const post = await Post.findById(id);
    if(!post){
        return res.status(400).json({error: 'No such post'})
    }
    res.status(200).json(post);

}

//edit post
const editPost = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such post'});
    }

    const post = await Post.findOneAndUpdate({_id : id},{...req.body});

    if(!post){
        return res.status(400).json({error: 'No such post'})
    }
    res.status(200).json(post);

}

//delete post
const deletePost = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such post'});
    }

    const post = await Post.findOneAndDelete({_id: id});

    if(!post){
        return res.status(400).json({error: 'No such post'})
    }
    res.status(200).json(post);
}

module.exports = {
    displayAllPosts,
    displayPost,
    editPost,
    deletePost,
    createPost,
    displayAllUserPosts
}
