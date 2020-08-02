const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const propaneForm = new Schema({

        location: {
            type: String,
        },
        employeeName: {
            type: String,
        },
        notes: {
            type: String,
        },
        picture: {
            type: String, 
        },
        tanksLeft: {
            type: String,
        },
        date: {
            type: Date,
            default: Date.now
        },
});

module.exports = propane = mongoose.model('Propane', propaneForm, 'Propane' );