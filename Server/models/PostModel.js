const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId, 
        ref: "User",
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: "User",
    }],
    comments: [{
        userId: { type: Schema.Types.ObjectId, ref: "User" },
        text: { type: String, required: true },
        timestamp: { type: Date, default: Date.now }
    }]
},{timestamps: true});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;