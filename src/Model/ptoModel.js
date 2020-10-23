const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ptoForm = new Schema({

    employeeNum: {
        type: String
    },
    firstName: {
        type: String
    },
    dm: {
        type: String
    },
    departments: {
        type: String
    }, 
    absenceFrom: {
        type: String
    },
    absenceTo: {
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
    date: {
        type: String,
    },
});

module.exports = PTO = mongoose.model('PTO', ptoForm, 'PTO' );