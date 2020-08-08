const express = require('express');
const storeRouter = express.Router();
const bodyParser = require('body-parser');
const Mongoose = require('mongoose');
const cors = require('cors');

let Store = require('../src/Model/Stores');
storeRouter.use(bodyParser.json());
storeRouter.use(bodyParser.urlencoded({extended: false}));
storeRouter.use(cors());


storeRouter.post('/', cors(), async (req,res) => {
    const dm = req.body.dm;
    const district = req.body.district;
    console.log(district);
    const update = new Store();
    try {
    await update.updateMany({ dm: dm }, {$set: { district: district }}, {runValidators: false }, (err, result) => {
        if (err) {
            console.log(err)
        }
        console.log('Updates Completed');
    }) //} 
    //catch (err) {
        console.log(err);
    //}
    //try {

    await update.save({validateBeforeSave: false }, (err) => {
        if (err) {
            console.log(err);
            return;
        }
        res.send('Updates Completed');
    });
    } catch (err) {
        console.log(err);
    } 

})

storeRouter.get('/', cors(), (req, res) => {

    res.send('<form action="/api/updateStores" method="POST" ><label>District</label><input type="text" name="district" /><br /><label>DM:</label><input type="text" name="dm" /><br /><input type="submit" /></form>');
});

module.exports = storeRouter;