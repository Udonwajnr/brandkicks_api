const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.header('Authorization');
    const apiKey = req.header('x-api-key');

    if (!token || !apiKey) {
        return res.status(401).json({ message: 'Unauthorized: Both API key and token are required' });
    }

    // Check API Key
    if (apiKey !== process.env.API_KEY) {
        return res.status(403).json({ message: 'Invalid API Key' });
    }

    // Verify JWT Token
    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
        req.user = {id:decoded.id, isAdmin:decoded.isAdmin, name:decoded.name,email:decoded.email};
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

const authorizeAdmin = (req, res, next) => {
    if (!req.user || !req.user.isAdmin) {
        return res.status(403).json({ message: 'Access denied' });
    }
    next();
};

module.exports={authenticate,authorizeAdmin}