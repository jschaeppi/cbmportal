const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')
const User = require('../src/Model/usersModel');

module.exports = async function(req, res, next) {
    const token = req.cookies['auth-token'];
    try {
    const decoded = jwt.verify(token, process.env['jwtSecret']);
    let user = await User.findOne({ _id: decoded.user.id })
    .select('-password').lean();
    req.user = user;
        next();
    }
    catch(err) {
        next(err);
    }
}