const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        default:""
    },
    profilePicture: {
        type: String,
        default:""
    },
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' }],
    following: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' }],
}, {timestamps: true});

const User = mongoose.model('User', userSchema);
module.exports = User;