const express = require('express');
const storesRouter = express.Router();
const bodyParser = require('body-parser');
let Store = require('../src/Model/Stores');

storesRouter.use(bodyParser.json());
storesRouter.use(bodyParser.urlencoded({extended: false}));

storesRouter.get('/', (req, res) => {
    Store.find()
    .sort( { banner: -1 })
    .then(stores => res.json(stores));
    
});

storesRouter.get('/:district', (req, res) => {
    const districts = req.params.district;
    if (districts.length > 1) {
        Store.find({district: {$in: districts.split(',')}}, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.json(result);
            }
        }).sort( { banner: -1, store: 1})
    } else {
    Store.find({ district: districts }, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    }
    ).sort({ banner: -1 })
}
});

module.exports = storesRouter;