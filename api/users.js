const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../src/Model/usersModel');
const config = require('config');
//require('./passport')(passport);

router.get('/loginSub', async (req, res) => {
    const token = req.header('x-auth-token');
    if (!token) {
        res.status(401).json({issue: 'Not Authorized'})
    }
    try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    const { exp } = decoded;
    if (Date.now() >= exp * 1000) {
        res.status(401).json({msg: 'Unathorized Access'});
      } else {
    let user = await User.findOne({ _id: decoded.user.id })
    .select('-password');
    res.json({decoded, user});
        } 
    }
    catch(err) {
        console.log(err.name);
        if (err.name === 'TokenExpiredError') {
            res.status(401).json({ msg: 'Not Authorized, please login' })
        } else {
        res.json({issue: 'Server Error'});
        }
    }

})

router.post('/loginSub', async (req, res, next) => { 
    const { username, password } = req.body.data;
    try {
    let user = await User.findOne({ username });
        if (!user) {
            res.status(400).json ({msg: 'Invalid Credentials'})
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            res.status(400).json({msg: 'Invalid Credentials'});
        } 

        const payload = {
            user: {
                id: user.id,
            }
        }
        jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 19800}, (err, token) => {
            if (err) throw err;
            res.json({token, user, msg: true})
        })


    }
    catch (err) {
        if (err) {
            console.log(err);
            res.status(500).json({msg: 'Server Error'});
        }
    }
})
router.post('logout', (req, res, next) => {
    req.logout();
})
module.exports = router;
