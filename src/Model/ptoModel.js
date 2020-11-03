const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ptoForm = new Schema({

    employeeNum: {
        type: String
    },
    employeeName: {
        type: String
    },
    dm: {
        type: String
    },
    departments: {
        type: String
    }, 
    absencefrom: {
        type: String
    },
    absenceto: {
        type: String
    },
    hours: {
        type: String
    },
    approval: {
        type: String
    },
    comments: {
        type: String
    },
    sig: {
        type: String
    },
    date: {
        type: String,
    },
});

module.exports = PTO = mongoose.model('PTO', ptoForm, 'PTO' );