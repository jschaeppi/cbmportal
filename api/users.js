const express = require('express');
const router = express.Router();
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
    origin: ['http://portal.cbmportal.com','http://portal.cbmportal.com:5000', 'http://127.0.0.1:3000', 'http://localhost:3000'],
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
    credentials: true
  }));


router.get('/loginSub', async (req, res) => {
    const token = req.header('x-auth-token');
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

router.get('/loginSubTest', async (req, res, next) => { 

    try {
       
        await sessionLookup.findOne({ 'session.user.id': req.session.user.id}, (err) => {
            if (err) {
                res.status(404).json({issue: 'No session found'});
            }
        })
        user = await User.findOne({ _id: req.session.user.id })

        if (!user) {
            res.status(400).json ({msg: 'Please login'})
        }

        if (user) {
            res.json({user: user, msg: true})
        }
}

    catch(err) {
        console.log(err)
        res.status(500).json({issue: 'Server Error'});
    }
})

router.post('/loginSubTest', async (req, res, next) => {
    const { username, password } = req.body.data;
    try {
    let user = await User.findOne({ username })
        if (!user) {
            res.status(400).json ({msg: 'Invalid Credentials'})
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({msg: 'Invalid Credentials'});
        }

        if (user) {
            req.session.user = { 
                id: user._id,
             };
             
            res.json({userid: user._id, user: user, msg: true})
        }
        
}
    catch (err) {
        if (err) {
            console.log(err);
        }
    }
})
router.post('/loginSub', async (req, res) => { 
    const { username, password } = req.body.data;
    try {
    let user = await User.findOne({ username });
    if (!user) {
        res.status(400).json ({msg: 'Invalid Credentials'});
    }
        const isMatch = await bcrypt.compare(password, user.password);
        const payload = {
            user: {
                id: user.id,
            }
        }
        if (!isMatch) {
            res.status(400).json({msg: 'Invalid Credentials'});
        } 
        jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 19800}, (err, token) => {
            if (err) throw err;
            res.json({token, user, msg: true})
        })


    }
    catch (err) {
            console.log(err);
            //res.status(500).json({msg: 'Server Error'});
    }
})
router.post('logout', (req, res, next) => {
    req.logout();
})

module.exports = router;