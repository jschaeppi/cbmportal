const express = require('express');
const adminRouter = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const checkAuth = require('../api/authCheck');
const cookieParser = require('cookie-parser')
const {formSelection, upperTitle, camelCase, formSearch} = require('./helpers/hbs_helpers');
const { transporter, departmentEmail, htmlGeneration } = require('../config/api_funcs');
const { mailOptions } = require('./helpers/mail_util');

adminRouter.use(bodyParser.json());
adminRouter.use(bodyParser.urlencoded({extended: false}));
adminRouter.use(cookieParser());

adminRouter.get('/', cors(), (req, res) => {
    if (req.query.login === "failure") {
        res.render('main', {msg: 'Invalid Credentials'});
    } else if (req.cookies['auth-token']) {
        res.redirect('/admin/dashboard');
    }else {
        res.render('main');
    }
});
adminRouter.get('/dashboard/viewFormDetails/:form/:id', checkAuth, async (req, res) => {
    const { form, id } = req.params;
    let result = {};
    try {
        result = await formSelection(false, form, id);
        result = camelCase(result, 'dm');
        res.render(`detailViews/${form}Details`, {title: upperTitle(form, 'details'), result, user: req.user})
    } catch (err) {
        console.log(err);
    }
})
 adminRouter.get('/dashboard', checkAuth, cors(), async (req, res) => {
        if (req.user.permission > 1) {
            if (req.user.permission >= 3 && (req.query.form)) { 
                const { form } = req.query;
                let result = {};
                try {
                    if (form == "uniform") {
                        result = await formSelection(true, form)
                        res.render(`dashViews/${form}Dash`, {title: upperTitle(form, 'submissions'), result, user: req.user})
                    } else if (form !== "uniform") {
                        result = await formSelection(true, form)
                        result = camelCase(result, 'dm');
                        res.render(`dashViews/${form}Dash`, {title: upperTitle(form, 'submissions'), result, user: req.user})
                    }
                } catch (err) {
                    if (err) {
                        console.log(err);
                    }
                } 
            } else if (!req.params.form) {
                res.render('dashboard', {title: 'CBM Admin Dashboard', user: req.user});
            } 
        } else if (!req.cookies['auth-token']) {
                res.render('main', {msg: 'Please Login'});
        } else {
                res.render('main', {msg: 'Invalid Credentials'}); 
        }

 });

adminRouter.post('/dashboard', checkAuth, async (req, res) => {
    let { form, searchString } = req.query;
        if (searchString) {
        let submission = await formSearch(form, searchString);
        if (submission.length === 1) {
            res.render(`dashViews/${form}Dash`, {title: upperTitle(form, 'submissions'), submission, user: req.user});
        } else if (submission.length > 1) {      
            submission = camelCase(submission, 'employeeName');
            searchString = searchString.charAt(0).toUpperCase() + searchString.substr(1);
            res.render(`dashViews/${form}Dash`, {title: upperTitle(form, 'submissions'), submission, user: req.user});
        } else {
            res.render(`dashViews/${form}Dash`, {title: upperTitle(form, 'submissions'), user: req.user});
        }
    }
            
})
adminRouter.get('/dashboard/mailItems/:form/:id', checkAuth, async (req, res) => {
    const { form, id } = req.params;
    
    let result = {};
    try {
        result = await formSelection(false, form, id);
        const receiver = await departmentEmail(form);
        const content = await htmlGeneration(result, form);
        const mailParams = await mailOptions(req.user.dm, form, receiver, content)
        const mailSuccess = await transporter.sendMail(mailParams);
        if (mailSuccess) {
            console.log('Mail success');
            res.redirect('/admin/dashboard');
        }
    } catch (err) {
        console.log(err);
    }
})
adminRouter.get('/dashboard/logout', (req, res) => {
    console.log('logout page');
    res.clearCookie('auth-token', {domain: 'cbmportal.com'});
    res.redirect('/admin');
})
module.exports = adminRouter;