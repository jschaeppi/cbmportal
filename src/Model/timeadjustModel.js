const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const timeadjustForm = new Schema({

        employeeName: {
            type: String,
        },
        employeeNum: {
            type: String,
        },
        dm: {
            type: String, 
        },
        adjustments: {
            type: Array,
        },
        notes: {
            type: String,
        },
});

module.exports = TimeAdjust = mongoose.model('TimeAdjust', timeadjustForm, 'TimeAdjust' );