const express = require('express');
const adminRouter = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const checkAuth = require('../api/authCheck');
const cookieParser = require('cookie-parser')
//adminRouter.engine('handlebars', exphbs());
//adminRouter.set('view engine', 'hbs');
adminRouter.use(cookieParser());

adminRouter.get('/', cors(), (req, res) => {
    console.log(req.query);
    if (req.query.login === "failure") {
        res.render('main', {msg: 'Invalid Credentials'});
    } else {
        res.render('main');
    }
});

 adminRouter.get('/dashboard', checkAuth, cors(), (req, res) => {
    console.log(req.user);
    if ((req.user)) {
        if (req.user.permission > 1) {
    res.render('dashboard', {title: 'CBM Portal Admin', content:'Here is where the data showing would be.', user: req.user});
        } else if (req.user.permission < 2) {
            
            res.render('main', {msg: 'You don\'t have high enough access'});
        } else {
            res.render('main', {msg: 'Invalid Credentials'});
        }
    } else {
        res.render('main', {msg: 'Please login'});
    }
 });
module.exports = adminRouter;