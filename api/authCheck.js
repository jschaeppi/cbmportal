const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')
const User = require('../src/Model/usersModel');
module.exports = async function(req, res, next) {
    const token = req.cookies['auth-token'];
    try {
    const decoded = jwt.verify(token, process.env['jwtSecret']);
    const { exp } = decoded;
    if (Date.now() >= exp * 1000) {
        res.status(401);
      } else {
    let user = await User.findOne({ _id: decoded.user.id })
    .select('-password').lean();
    req.user = user;
        } 
        next();
    }
    catch(err) {
        console.log(err.name);
        if (err.name === 'TokenExpiredError') {
            res.status(401);
        } else {
        res.status(500).redirect('/admin');
        }
    }
}