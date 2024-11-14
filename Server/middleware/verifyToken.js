const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization;

    if(!token){
        return res.status(400).json({mssg:'Access denied!'});
    }

    try{
        const actualToken = token.split(' ')[1];
        const decode = jwt.verify(actualToken, process.env.SECRET);
        req.user = decode; // req.user has user id --> i can use it in routes under req.user
        next();
    } catch (error) {
        res.status(400).json({mssg:'something went wrong'});
    }
    
};

module.exports = verifyToken;