const jwt = require('jsonwebtoken');
const User = require('../models/UserModel'); // Import your User model

const requireAuth = async (req, res, next) => {
   const {authorization} = req.header;

   if(!authorization){
    return res.status(401).json({error:'Token required'});
   }

   const token = authorization.split(' ')[1];
   try{
    const { _id } = jwt.verify(token, process.env.SECRET);
    req.user = await User.findById(_id).select('_id');
    next();
   } catch (error){
    res.status(401).json({error:'Request not authorized'});
   }
};

module.exports = requireAuth;