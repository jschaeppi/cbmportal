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


router.get('/loginSub', async (req, res) => {
    //console.log(req.header['Authorization'])
    const token = req.header('x-auth-token');
    try {
    const decoded = await jwt.verify(token, config.get('jwtSecret'));
    const { exp } = decoded;

    let user = await User.findOne({ _id: decoded.user.id })
    .select('-password');
    res.cookie('auth-token', token, {domain: 'cbmportal.com', maxAge: 3 * 60 * 60 * 1000, httpOnly: true, secure: true, sameSite: 'strict' });
    res.json({decoded, user});
    }
    catch(err) {
        if (!token) {
            res.status(401).json({msg: 'Not Authorized'});
        } else if (err === 'TokenExpiredError: jwt expired') {
            res.status(401).json({ msg: 'Unauthorized'});
        } else {
        console.log(err);
        res.status(500).json({ msg: 'Server Error'});
        }
    }

})

router.get('/loginSubTest', async (req, res, next) => { 
    const token = req.cookies['auth-token'];
    console.log(req.cookies)
    try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    const { exp } = decoded;

    let user = await User.findOne({ _id: decoded.user.id })
    .select('-password');
    res.json({decoded, user});
    }
    catch(err) {
        if (!token) {
            res.status(401).json({issue: 'Not Authorized'});
        } else {
        console.log(err);
        res.status(500).json({ issue: 'Server Error'});
        }
    }
})

router.post('/loginSubAdmin', async (req, res, next) => {
    try {
        const username = req.body.username;
        const password = req.body.password;

    let user = await User.findOne({ username });
    if (!user) {
        res.status(400).redirect('https://admin.cbmportal.com:5000/admin/?login=failure')
    }
        const isMatch = await bcrypt.compare(password, user.password);
        const payload = {
            user: {
                id: user.id,
            }
        }
        if (!isMatch) {
            res.status(400).redirect('https://admin.cbmportal.com:5000/admin/?login=failure');
        } 
        jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 19800}, (err, token) => {
           if (err) throw err;
                if (token) {
                    res.cookie('auth-token', token, {domain: 'cbmportal.com', maxAge: 3 * 60 * 60 * 1000, httpOnly: true, secure: true, sameSite: true }).redirect('https://admin.cbmportal.com:5000/admin/dashboard');
                }else {
                    res.redirect('https://admin.cbmportal.com:5000/admin/?login=failure');
                }
        })
    }
    catch (err) {
            console.log(err);
            res.status(500).json({msg: 'Server Error'});
    }
})
router.post('/loginSub', async (req, res) => { 
    try {
        const { username, password } = req.body.data;
    let user = await User.findOne({ username });

        if (!user) {
            res.status(400).json({ msg: 'Invalid Credentials'});
        } else {
        const isMatch = await bcrypt.compare(password, user.password);
        const payload = {
            user: {
                id: user.id,
            }
        }

        if (!isMatch) {
            res.status(400).json({ msg: 'Invalid Credentials'})
        }
            jwt.sign(payload, config.get('jwtSecret'), { expiresIn: '3h'}, (err, token) => {
                if (err) throw err;
                res.cookie('auth-token', token, {domain: 'cbmportal.com', maxAge: 3 * 60 * 60 * 1000, httpOnly: true, secure: true });
                //res.cookie('auth-token', token, { maxAge: 3 * 60 * 60 * 1000, httpOnly: true, secure: true });
                res.json({token, user, msg: true});

            })
        }

    }
    catch (err) {
            console.log(err);
            if (err === 'JsonWebTokenError') {
                res.status(401).json({ msg: 'Unauthorized'});
            }
            else {
            res.status(500).json({msg: 'Server Error'});
            }
    }
})
router.post('logout', (req, res, next) => {
    req.logout();
})

module.exports = router;