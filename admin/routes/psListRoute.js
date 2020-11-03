const express = require('express');
const psListRouter = express.Router();
const cors = require('cors');
const checkAuth = require('../../api/authCheck');
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
let PSList = require('../../src/Model/psModel');


psListRouter.use(bodyParser.json());
psListRouter.use(bodyParser.urlencoded({extended: false}));
psListRouter.use(cookieParser());

psListRouter.get('/removePS/:psId', checkAuth, cors(), async (req, res) => {
    const { psId } = req.params;
    if (psId) {
        try {
            const list = await PSList.findOne({ _id: psId }).lean();
            await PSList.deleteOne({ _id: list._id });
            res.redirect(`/admin/dashboard/psList?psDeleteStatus=true&ps=${list.ps}`);
        } catch (err) {
            if (err) {
                res.redirect(`/admin/dashboard/psList?psDeleteStatus=false&ps=${list.ps}`);
                console.log(err);
            }
        }
    }
 });

 psListRouter.get('/', checkAuth, cors(), async (req, res) => {
     if (req.user.permission > 3) {
        const { psDeleteStatus, ps, employee, created, updated } = req.query;
        const districts = req.user.district;
        if (districts.length > 1) {
            const result = await PSList.find({district: {$in: districts.split(',')}}).sort( { dm: 1 }).lean();
            res.render('psList', {result, ps, psDeleteStatus, updated, employee, created, user: req.user});
        } else {
            const result = await PSList.find({ district: districts }).sort({ dm: 1 })
                res.render('psList', {result, ps, psDeleteStatus, employee, updated, created, user: req.user});
        }
    } else {
        res.redirect('./');
    }
});

psListRouter.get('/editPS/:psID', checkAuth, cors(), async (req, res) => {
    const { psID } = req.params;
    const { permission } = req.user;
    
    if (permission > 3) {
        const result = await PSList.findOne({ _id: psID }).lean();
        res.render('editPS', {result, user: req.user })
    } else {
        res.redirect(`/admin/dashboard/psList?allowed=false`)
    }
 });

 psListRouter.post('/editPS/', checkAuth, cors(), async (req, res) => {
    const { dm, district, ps, id } = req.body;
    if (dm != null && district != null && ps != null) {
        let result = await PSList.updateOne({ _id: id}, {$set: { ps, district, dm }}).lean();
        result = await PSList.findOne({ _id: id }).lean();
        if (result) {
            res.redirect(`/admin/dashboard/psList?ps=${result.ps}&updated=true` );
        } else {
            res.redirect(`/admin/dashboard/psList?ps=${result.ps}&updated=false` );
        }
    }
 });

psListRouter.post('/createPS', checkAuth, (req, res) => {
    const { ps, employee, district } = req.body;
    const { fullName } = req.user;
    let form = new PSList;
    form.ps = `${ps} ${employee}`;
    form.dm = `${fullName}`;
    form.district = district;
    form.save(function(err) {
        if (err) {
            console.log(err);
            return;
        } else {
            res.redirect(`/admin/dashboard/psList?ps=${ps} ${employee}&created=true`);
        }
    });
})
module.exports = psListRouter;