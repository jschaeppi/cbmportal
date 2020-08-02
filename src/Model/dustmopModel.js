const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const dustmopForm = new Schema({

        location: {
            type: String,
        },
        employeeName: {
            type: String,
        },
        picture: {
            type: String, 
        },
        mopsLeft: {
            type: String,
        },
        date: {
            type: Date,
            default: Date.now
        },
});

module.exports = dustmop = mongoose.model('Dustmop', dustmopForm, 'Dustmop' );