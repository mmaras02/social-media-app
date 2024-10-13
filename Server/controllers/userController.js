const { verify } = require('jsonwebtoken');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

//display profile(user), edit profile, 
//display all users
const displayUsers = async (req, res) => {
    const user = await User.find({}).sort({createdAt:-1});

    res.status(200).json(user);
}

const displayProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Server error while fetching profile' });
    }
};

const editProfile = async (req, res) => {
    const { id } = req.params;

    const user = await User.findOneAndUpdate(
        { _id: id },
        {
            ...(req.body.username && { username: req.body.username }),
            ...(req.body.bio && { bio: req.body.bio }),
            ...(req.file && { profilePicture: `/uploads/${req.file.filename}` })
        }
    );

    if (!user) {
        return res.status(404).json({ error: 'No such user' });
    }

    res.status(200).json(user);
}
const createUser = async (req, res) => {
    const {username, email, name, password,bio, profilePicture, followers, following } = req.body;

    try{
        const user = await User.create({username, email, name, password,bio, profilePicture, followers, following });
        res.status(200).json(user);

    } catch(error){
        res.status(400).json({error: error.message});
    }
    res.json({mssg: 'create new user'});
}

module.exports = {
    displayUsers,
    displayProfile,
    editProfile,
    createUser
}