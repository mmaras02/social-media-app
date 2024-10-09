const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET,{expiresIn:'3d'});
}

//user login
const loginUser = async (req, res) => {
    console.log("Request received", req.body);
    
    const {email, password} = req.body;
    console.log("Parsed credentials", { email, password });

    try{
        if(!email || !password){
            throw Error('All fields must be filled');
        }
        
        const user = await User.findOne({email: email});
        if(!user){
            res.status(400).json({ error: 'Email is incorrect' });
        }
        const validPassword = await bcrypt.compare(password,user.password);
        if(!validPassword){
            res.status(400).json({ error: 'Password is incorrect' });
        }
        const token = createToken(user._id);

        res.status(200).json({email, token});

    } catch(error) {
        res.status(400).json({error: error.message});
    }
    
}

const registerUser = async (req, res) => {
    //req.body-->email,paassword
    const {email, password, name, username} = req.body;

    //validate email,strong password

    try{
        const exist = await User.findOne({email});

        if(exist){
            throw Error('Email already in use');
        }
    
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password,salt)
    
        const user = await User.create({email, password: hash, name, username});
    
        //create a token
        const token = createToken(user._id);
        res.status(200).json({email, token});

    } catch(error) {
        res.status(400).json({error: error.message});
    }
    
}

module.exports = {loginUser, registerUser};