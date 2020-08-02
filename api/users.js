express = require('express');
router = express.Router();
const cors = require('cors');
const mongoose = require('mongoose');
bodyParser = require('body-parser');
const passport = require('passport');
const Session = require('../src/Model/sessionValidate');
const db = require('../src/config/db');
require('./passport')(passport);

router.get('/loginSub', (req, res) => {
    console.log(req.session)
    if (req.isAuthenticated()) {
        console.log('Authenticated!')
    }
    console.log("Hi")
    /*Session.find({'session.passport.user': req.session.id}, (err, result) => {
        if (err) { 
            console.log(err);
        }
        console.log(result);
    });
    if (req.session.id) {
        //res.json({session: session});
    } else {
        console.log('Couldn\'t find session');
    }*/
    
})

router.post('/loginSub', (req, res, next) => { 
    console.log('hey')
    passport.authenticate('local', (err, user, info) => {{
        if (err) {
            res.json({ err: 'Ooops, something went wrong'})
        }

        if (!user) {
            res.json ({msg: 'Not logged in'})
        }

        req.logIn(user, (err) => {
            if (err) {
                return console.log(err);
            }
            console.log(req.session);
            console.log(user);
            res.redirect('http://portal.cbmportal.com')
            //res.json({ user: user, session: req.session });
            
        })
    
}})(req, res, next);

});

router.post('logout', (req, res, next) => {
    req.logout();
})
module.exports = router;
