const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const perdiemForm = new Schema({

        employeeName: {
            type: String,
        },
        employeeNum: {
            type: String,
        },
        dm: {
            type: String,
        },
        location: {
            type: String, 
        },
        city: {
            type: String,
        },
        state: {
            type: String,
        },
        firstNight: {
            type: String,
        },
        lastNight: {
            type: String, 
        },
        arrivalDate: {
            type: String,
        },
        departureDate: {
            type: String,
        },
        comments: {

        },
        mileage: {
            type: Array,
        }
});

module.exports = Perdiem = mongoose.model('Perdiem', perdiemForm, 'Perdiem' );