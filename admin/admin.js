const express = require('express');
const adminRouter = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const checkAuth = require('../api/authCheck');
const cookieParser = require('cookie-parser')
let Store = require('../src/Model/Stores');
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

 adminRouter.get('/dashboard/stores', checkAuth, cors(), (req, res) => {
    console.log(req.user);
    const districts = req.user.district;
    if (districts.length > 1) {
        Store.find({district: {$in: districts.split(',')}}, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
                res.render('stores', {result});
            }
        }).sort( { banner: -1, store: 1}).lean();
    } else {
    Store.find({ district: districts }, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.render('stores', {result});
        }
    }
    ).sort({ banner: -1 })
}
 });
module.exports = adminRouter;