const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mileageForm = new Schema({

        employeeName: {
            type: String,
        },
        employeeNum: {
            type: String,
        },
        dm: {
            type: String, 
        },
        mileage: {
            type: Array,
        },
        comments: {
            type: String,
        },
        date: {
            type: String,
        }
});

module.exports = Mileage = mongoose.model('Mileage', mileageForm, 'Mileage' );