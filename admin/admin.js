const express = require('express');
const adminRouter = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const checkAuth = require('../api/authCheck');
const cookieParser = require('cookie-parser')
let Backpay = require('../src/Model/backpayModel');
let Bonus = require('../src/Model/bonusModel');
let Hotel = require('../src/Model/hotelModel');
let Mileage = require('../src/Model/mileageModel');
let Newhire = require('../src/Model/newhireModel');
let PerDiem = require('../src/Model/perdiemModel');
let PTO = require('../src/Model/ptoModel');
let TargetSupply = require('../src/Model/targetsupply');
let Term = require('../src/Model/termModel');
let TimeAdjustment = require('../src/Model/timeadjustModel');
let Uniform = require('../src/Model/uniformModel');
let WT = require('../src/Model/wtModel');
const FormFuncs = require('./helpers/hbs_helpers');
const Mail = require('./helpers/mail_util');

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
    if (form == "backpay") {
        result = await Backpay.findOne({_id: id}).lean();
        FormFuncs.camelCase(result, 'employeeName');
        res.render('detailViews/backpayDetails', {title: FormFuncs.upperTitle(form, 'details'), result, user: req.user})
    } else if (form == "bonus") {
        result = await Bonus.findOne({_id: id}).lean();
        FormFuncs.camelCase(result, 'employeeName');
        res.render('detailViews/bonusDetails', {title: FormFuncs.upperTitle(form, 'details'), result, user: req.user})
    } else if (form == "hotel") {
        result = await Hotel.findOne({_id: id}).lean();
        FormFuncs.camelCase(result, 'store');
        res.render('detailViews/hotelDetails', {title: FormFuncs.upperTitle(form, 'details'), result, user: req.user})
    } else if (form == "mileage") {
        result = await Mileage.findOne({_id: id}).lean();
        FormFuncs.camelCase(result, 'employeeName');
        res.render('detailViews/mileageDetails', {title: FormFuncs.upperTitle(form, 'details'), result, user: req.user})
    } else if (form == "newhire") {
        result = await Newhire.findOne({_id: id}).lean();
        FormFuncs.camelCase(result, 'dm');
        res.render('detailViews/newhireDetails', {title: FormFuncs.upperTitle(form, 'details'), result, user: req.user})
    } else if (form == "perDiem") {
        result = await PerDiem.findOne({_id: id}).lean();
        FormFuncs.camelCase(result, 'dm');
        res.render('detailViews/perDiemDetails', {title: FormFuncs.upperTitle(form, 'details'), result, user: req.user})
    } else if (form == "pto") {
        result = await PTO.findOne({_id: id}).lean();
        FormFuncs.camelCase(result, 'employeeName');
        res.render('detailViews/ptoDetails', {title: FormFuncs.upperTitle(form, 'details'), result, user: req.user})
    } else if (form == "termination") {
        result = await Term.findOne({_id: id}).lean();
        FormFuncs.camelCase(result, 'employeeNum');
        res.render('detailViews/terminationDetails', {title: FormFuncs.upperTitle(form, 'details'), result, user: req.user})
    } else if (form == "targetOrder") {
        result = await TargetSupply.findOne({_id: id}).lean();
        FormFuncs.camelCase(result, 'employeeName');
        console.log(result.employeeName);
        res.render('detailViews/targetOrderDetails', {title: FormFuncs.upperTitle(form, 'details'), result, user: req.user})
    } else if (form == "uniform") {
        result = await Uniform.findOne({_id: id}).lean();
        FormFuncs.camelCase(result, 'firstName');
        res.render('detailViews/uniformDetails', {title: FormFuncs.upperTitle(form, 'details'), result, user: req.user})
    } else if (form == "wt") {
        result = await WT.findOne({_id: id}).lean();
        FormFuncs.camelCase(result, 'employeeName');
        res.render('detailViews/wtDetails', {title: FormFuncs.upperTitle(form, 'details'), result, user: req.user})
    }
})
 adminRouter.get('/dashboard', checkAuth, cors(), async (req, res) => {
        if (req.user.permission < 2) {
            res.render('main', {msg: 'You don\'t have high enough access'});
        } else if (req.user.permission >= 3) {  
            try {
                const { form } = req.query;
                let result = {};
                if (form == 'backpay') {
                    result = await Backpay.find({}).lean().sort({dm: 1});
                    FormFuncs.camelCase(result, 'employeeName');
                    res.render('dashViews/backpayDash', {title: FormFuncs.upperTitle(form, 'submissions'), result, form, user: req.user});
                } else if(form == 'bonus') {
                    let result = await Bonus.find({}).lean().sort({dm: 1});
                    FormFuncs.camelCase(result, 'employeeName');
                    res.render('dashViews/bonusDash', {title: FormFuncs.upperTitle(form, 'submissions'), result, form, user: req.user});
                } else if (form == 'hotel') {
                    result = await Hotel.find({}).lean().sort({Date: 1});
                    FormFuncs.camelCase(result, 'store' );
                    res.render('dashViews/hotelDash', {title: FormFuncs.upperTitle(form, 'submissions'), result, form, user: req.user});
                } else if(form == 'mileage') {
                    let result = await Mileage.find({}).lean().sort({dm: 1});
                    FormFuncs.camelCase(result, 'employeeName');
                    res.render('dashViews/mileageDash', {title: FormFuncs.upperTitle(form, 'submissions'), result, form, user: req.user});
                } else if (form == 'newhire') {
                    result = await Newhire.find({}).lean().sort({date: -1});
                    FormFuncs.camelCase(result, 'dm');
                    res.render('dashViews/newhireDash', {title: FormFuncs.upperTitle(form, 'submissions'), result, form, user: req.user});
                } else if(form == 'perDiem') {
                    let result = await PerDiem.find({}).lean().sort({dm: 1});
                    FormFuncs.camelCase(result, 'dm');
                    res.render('dashViews/perDiemDash', {title: FormFuncs.upperTitle(form, 'submissions'), result, form, user: req.user}); 
                } else if (form == 'pto') {
                    result = await PTO.find({}).lean().sort({date: 1});
                    FormFuncs.camelCase(result, 'employeeNum');
                    res.render('dashViews/ptoDash', {title: FormFuncs.upperTitle(form, 'submissions'), result, form, user: req.user});
                } else if(form == 'targetOrder') {
                    let result = await TargetSupply.find({}).lean().sort({dm: 1});
                    FormFuncs.camelCase(result, 'employeeName');
                    res.render('dashViews/targetOrderDash', {title: FormFuncs.upperTitle(form, 'submissions'), result, form, user: req.user});
                } else if (form == 'termination') {
                    result = await Term.find({}).lean().sort({dm: 1});
                    FormFuncs.camelCase(result, 'employeeNum');
                    res.render('dashViews/terminationDash', {title: FormFuncs.upperTitle(form, 'submissions'), result, form, user: req.user});
                } else if(form == 'timeAdjustment') {
                    let result = await TimeAdjustment.find({}).lean().sort({dm: 1});
                    FormFuncs.camelCase(result);
                    res.render('dashViews/timeadjustmentDash', {title: FormFuncs.upperTitle(form, 'submissions'), result, form, user: req.user}); 
                } else if (form == 'uniform') {
                    result = await Uniform.find({}).lean().sort({employeeNum: 1});
                    FormFuncs.camelCase(result, 'firstName');
                    res.render('dashViews/uniformDash', {title: FormFuncs.upperTitle(form, 'submissions'), result, form, user: req.user});
                } else if(form == 'wt') {
                    let result = await WT.find({}).lean().sort({dm: 1});
                    FormFuncs.camelCase(result, 'employeeName');
                    res.render('dashViews/wtDash', {title: FormFuncs.upperTitle(form, 'submissions'), result, form, user: req.user}); 
                } else {
                    res.render('dashboard', {title: 'CBM Admin Page', user:req.user});
                }
            } catch (err) {
                if (err) {
                    throw err;
                }
            }
             
        } else if (req.user.permission > 1) {
            res.render('dashboard', {title: 'CBM Admin Dashboard', user: req.user});
        } else if (!req.cookies['auth-token']) {
            res.render('main', {msg: 'Please Login'});
        } else {
            res.render('main', {msg: 'Invalid Credentials'}); 
        }

 });

adminRouter.get('/dashboard/mailItems', checkAuth, async (req, res) => {
    const { id } = req.query;
    try { 
        const result = await Backpay.find({ _id: id});
        const { employeeNum } = result
        Mail.prepareEmail(employeeNum);
        const mailSuccess = await transporter.sendMail(mailOptions);
        if (mailSuccess) {
            console.log('Mail success');
            res.redirect('/dashboard');
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