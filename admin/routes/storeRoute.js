const express = require('express');
const storesListRouter = express.Router();
const bcrypt = require('bcryptjs');
const cors = require('cors');
const checkAuth = require('../../api/authCheck');
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
let Store = require('../../src/Model/Stores')
let User = require('../../src/Model/usersModel');
const FormFuncs = require('../helpers/hbs_helpers');


storesListRouter.use(bodyParser.json());
storesListRouter.use(bodyParser.urlencoded({extended: false}));
storesListRouter.use(cookieParser());

storesListRouter.get('/removeStore/:storeId', checkAuth, cors(), async (req, res) => {
    const { storeId } = req.params;
    if (storeId) {
        try {
            const list = await Store.findOne({ _id: storeId }).lean();
            await Store.deleteOne({ _id: list._id });
            res.redirect(`/admin/dashboard/stores?storeDeleteStatus=true&store=${list.store}`);
        } catch (err) {
            if (err) {
                res.redirect(`/admin/dashboard/stores?storeDeleteStatus=false&store=${list.store}`);
                console.log(err);
            }
        }
    }
 });

 storesListRouter.get('/editStore/:storeID', checkAuth, cors(), async (req, res) => {
    const { storeID } = req.params;
    const { permission } = req.user;
    
    if (permission > 3) {
        const result = await Store.findOne({ _id: storeID }).lean();
        res.render('editStore', {result, user: req.user })
    } else {
        res.redirect(`/admin/dashboard/stores?allowed=false`)
    }
 });

 storesListRouter.post('/editStore/:storeID', checkAuth, cors(), async (req, res) => {
    const { storeID } = req.params;
    const { dm, district, store, id } = req.body;
    if (dm != null && district != null && store != null) {
        let result = await Store.updateOne({ _id: id}, {$set: { store, district, dm }}).lean();
        result = await Store.findOne({ _id: id }).lean();
        if (result) {
            res.redirect(`/admin/dashboard/stores?store=${result.store}&updated=true` );
        } else {
            res.redirect(`/admin/dashboard/stores?store=${result.store}&updated=false` );
        }
    }
 });

 storesListRouter.get('/', checkAuth, cors(), async (req, res) => {
    const { storeDeleteStatus, store, created, allowed, updated } = req.query;
    const districts = req.user.district;
    if (districts.length > 1) {
        const result = await Store.find({district: {$in: districts.split(',')}}).lean().sort( { banner: 1, store: 1});
        res.render('stores', {result, store, allowed, updated, storeDeleteStatus, created, user: req.user});
    } else {
        const result = await Store.find({ district: districts }).sort({ banner: 1, store: 1 }).lean();
        }
 });

 storesListRouter.post('/createStore', checkAuth, async (req, res) => {
    const { banner, store, job, district } = req.body;
    const { userFirst, userLast } = req.user;
    let form = new Store;
    form.banner = banner;
    form.store = `${job} - ${store}`;
    form.dm = `${userFirst} ${userLast}`;
    form.district = district;
    form.save(function(err) {
        if (err) {
            console.log(err);
            return;
        } else {
            res.redirect(`/admin/dashboard/stores?store=${job} - ${store}&created=true`);
        }
    });
})

module.exports = storesListRouter;