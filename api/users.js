const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const User = require('../src/Model/usersModel');
const config = require('config');
const storeRouter = require('./updateStores');
const MongoStore = require('connect-mongo');
const sessionLookup = require('../src/Model/sessionValidate');
//require('./passport')(passport);
router.use(cors({
    origin: ['https://portal.cbmportal.com','https://portal.cbmportal.com:5000', 'https://127.0.0.1:3000', 'https://localhost:3000'],
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
    credentials: true
  }));
  router.use(cookieParser());


router.get('/loginSub', async (req, res, next) => {
    const token = req.header('x-auth-token');
    try {
    const decoded = await jwt.verify(token, process.env['jwtSecret']);
    const { exp } = decoded;
    let user = await User.findOne({ _id: decoded.user.id })
    .select('-password');
    res.cookie('auth-token', token, {domain: 'cbmportal.com', maxAge: 3 * 60 * 60 * 1000, httpOnly: true, secure: true, sameSite: 'none' });
    res.json({decoded, token, user});
    }
    catch(err) {
        /*if (!token) {
            res.status(401).json({msg: 'Not Authorized'});
        } else if (err === 'TokenExpiredError: jwt expired') {
            res.status(401).json({ msg: 'Unauthorized'});
        } else {
        res.status(500).json({ msg: 'Server Error'});
        }*/
        next(err);
    }
})

router.get('/loginSubTest', async (req, res, next) => { 

    console.log(req.cookies)
    try {
    const decoded = jwt.verify(token, process.env['jwtSecret']);
    const { exp } = decoded;

    let user = await User.findOne({ _id: decoded.user.id })
    .select('-password');
    res.json({decoded, user});
    }
    catch(err) {
        if (!token) {
            res.status(401).json({issue: 'Not Authorized'});
        } else if (err === 'TokenExpiredError: jwt expired') {
            res.status(401).json({ msg: 'Session expired, please login again'});
        } else {
        res.status(500).json({ issue: 'Server Error'});
        }
    }
})

router.post('/loginSubAdmin', async (req, res, next) => {
    try {
        const username = req.body.username.toLowerCase();
        const password = req.body.password;

    let user = await User.findOne({ username });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(401).redirect('https://admin.cbmportal.com:5000/admin/?login=failure');
        } else {
            const payload = {
                user: {
                    id: user.id,
                }
            }
            jwt.sign(payload, process.env['jwtSecret'], { expiresIn: 19800}, (err, token) => {
            if (err) throw err;
                    if (token) {
                        res.cookie('auth-token', token, {domain: 'cbmportal.com', maxAge: 3 * 60 * 60 * 1000, httpOnly: true, secure: true, sameSite: true }).redirect('https://admin.cbmportal.com:5000/admin/dashboard');
                    }else {
                        res.redirect('https://admin.cbmportal.com:5000/admin/?login=failure');
                    }
            })
        }
    }
    catch (err) {
            next(err);
    }
})
router.post('/loginSub', async (req, res, next) => { 
    try {
        const { username, password } = req.body.data;
        let user = await User.findOne({ username });
        let passCompare = await bcrypt.compare(password, user.password);
        if (passCompare === true) {
            const payload = {
                user: {
                    id: user.id,
                }
            }
                jwt.sign(payload, process.env['jwtSecret'], { expiresIn: '3h'}, (err, token) => {
                    if (err) throw err;
                    res.cookie('auth-token', token, {domain: '*.cbmportal.com', maxAge: 3 * 60 * 60 * 1000, httpOnly: true, secure: true, sameSite: 'none' }).json({token, user, msg: true});
                    //res.cookie('auth-token', token, { domain: 'cbmportal.com' maxAge: 3 * 60 * 60 * 1000, httpOnly: true, secure: true });
                    res.json({token, user, msg: true});

                })
            } else {
                res.status(401).json({ msg: 'Bad Credentials'});
            }
        } 
    catch (err) {
        console.log(err);
            next(err)
    }
})
router.post('logout', (req, res, next) => {
    req.logout();
})

module.exports = router;