const { default: mongoose } = require('mongoose');
const Post = require('../models/PostModel');

//display all posts
const displayAllPosts = async (req, res) => {
    const post = await Post.find({}).sort({createdAt:-1});

    res.status(200).json(post);
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

//create post
const createPost = async (req, res) => {
    const {userId, description, image, likes, comments} = req.body;

    try{
        const post = await Post.create({userId, description, image, likes, comments});
        res.status(200).json(post);

    } catch(error){
        res.status(400).json({error: error.message});
    }
    res.json({mssg: 'create new post'});
}

module.exports = {
    displayAllPosts,
    displayPost,
    editPost,
    deletePost,
    createPost
}
