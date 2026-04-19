const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');

module.exports.protect = (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({message: "Not authorized to access this route"});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.admin = decoded;
        next();
    } catch (err) {
        return res.status(401).json({message: "Not authorized to access this route"});
    }
};

module.exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.admin.role)) {
            return res.status(403).json({message: `User role ${req.admin.role} is not authorized to access this route`});
        }
        next();
    };
};

module.exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.admin.role)) {
            return res.status(403).json({message: `User role ${req.admin.role} is not authorized to access this route`});
        }   
        next();
    };
};
