const jwt = require('jsonwebtoken');
const User = require('../models/UserModel'); // Import your User model

const requireAuth = async (req, res, next) => {
    // Get the Authorization header from the request
    const { authorization } = req.headers;

    // Check if the Authorization header is missing
    if (!authorization) {
        return res.status(401).json({ error: 'Authorization token required' });
    }

    // Extract token from the Authorization header
    const token = authorization.split(' ')[1]; // Bearer <token>

    try {
        // Verify the token using your secret key
        const { _id } = jwt.verify(token, process.env.SECRET);

        // Attach the user to the request object after verifying
        req.user = await User.findById(_id).select('_id'); // Optionally select fields

        next(); // Proceed to the next middleware/controller
    } catch (error) {
        // If token verification fails, respond with an unauthorized error
        res.status(401).json({ error: 'Request is not authorized' });
    }
};

module.exports = requireAuth;