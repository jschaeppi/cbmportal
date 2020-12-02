const express = require('express');
const portalUserRouter = express.Router();
const bcrypt = require('bcryptjs');
const cors = require('cors');
const checkAuth = require('../../api/authCheck');
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
let User = require('../../src/Model/usersModel');

portalUserRouter.use(bodyParser.json());
portalUserRouter.use(bodyParser.urlencoded({extended: false}));
portalUserRouter.use(cookieParser());

portalUserRouter.get('/', checkAuth, cors(), async (req, res) => {
    if (req.user.permission > 3) {
        const { portalUser, created, puDeleteStatus, updated } = req.query;
        const result = await User.find().sort( { email: 1 }).lean();
        res.render('portalUsers', {title: 'Portal Users', portalUser, created, puDeleteStatus, updated, result, user: req.user})
    } else {
        res.redirect('./');
    }
});

portalUserRouter.get('/editPortalUser/:puID', checkAuth, cors(), async (req, res) => {
    const { puID } = req.params;
    const { permission } = req.user;
    
    if (permission > 3) {
        let result = await User.findOne({ _id: puID }).select('-password').lean();
        res.render('editPortalUser', {result, user: req.user })
    } else {
        res.redirect(`/admin/dashboard/portalUsers?allowed=false`)
    }
 });

 portalUserRouter.post('/editPortalUser/', checkAuth, cors(), async (req, res) => {
    const { fullName, permission, email, district, id, username } = req.body;
    const saltRounds = 12;
    let { password } = req.body; 
    const userSplit = fullName.split(' ');
        
        try {
            if (userSplit.length > 2) {
                userFirst = userSplit[0];
                userLast = userSplit[1] + ' ' + userSplit[2];
            } else {
                userFirst = userSplit[0];
                userLast = userSplit[1];
            }
    if (district != null && fullName != null && permission != null && email != null && username != null) {
        if (password != null) {
        password = await bcrypt.hash(password, saltRounds);
        }
        let result = await User.updateOne({ _id: id}, {$set: { fullName, district, permission, email, password, username }}).lean();
        result = await User.findOne({ _id: id }).lean();
        if (result) {
            res.redirect(`/admin/dashboard/portalUsers?portalUser=${result.fullName}&updated=true` );
        } else {
            res.redirect(`/admin/dashboard/portalUsers?portalUser=${result.fullName}&updated=false` );
        }
    }
    } catch (err) {
        if (err) {
        console.log(err);
        return;
    }
}
 });

portalUserRouter.post('/createPortalUser', checkAuth, cors(), async (req, res) => {
    const { fullName, permission, email, district } = req.body;
    const saltRounds = 12;
    let { password } = req.body; 
    let userFirst = "",
        userLast = "";
    const userSplit = fullName.split(' ');
        
        try {
            if (userSplit.length > 2) {
                userFirst = userSplit[0];
                for (i = 1; i < userSplit.length; i++) {
                    userLast += userSplit[i] + ' ';
                }
                
            } else {
                userFirst = userSplit[0];
                userLast = userSplit[1];
            }
                password = await bcrypt.hash(password, saltRounds);
                let form = new User;
                form.userFirst = userFirst;
                form.userLast = userLast;
                form.district = district;
                form.password = password;
                form.fullName = fullName;
                form.permission = permission;
                form.username = userSplit[0].toLowerCase();
                form.email = email;
                form.save(function(err) {
                if (err) {
                    console.log(err);
                    return;
                } else {
                    const created = true;
                    res.redirect(`/admin/dashboard/portalUsers?portalUser=${fullName}&created=${created}`);
                }
            })
        }
                catch (err) {
                    if (err) {
                    console.log(err);
                    return;
                }
            }
});

portalUserRouter.get('/removePortalUser/:puId', checkAuth, cors(), async (req, res) => {
    const { puId } = req.params;
    if (puId) {
        try {
            const list = await User.findOne({ _id: puId }).lean();
            await User.deleteOne({ _id: list._id });
            res.redirect(`/admin/dashboard/portalUsers?puDeleteStatus=true&portalUser=${list.fullName}`);
        } catch (err) {
            if (err) {
                res.redirect(`/admin/dashboard/portalUsers?puDeleteStatus=false&portalUser=${list.fullName}`);
                console.log(err);
            }
        }
    }
 });

 module.exports = portalUserRouter;