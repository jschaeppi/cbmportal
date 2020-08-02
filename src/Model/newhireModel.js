const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const newhireForm = new Schema({

    firstName: {
        type: String
    },
    dm: {
        type: String
    },
    location: {
        type: String
    },
    hireType: {
        type: String
    },
    middleName: {
        type: String
    },
    firstLast: {
        type: String
    },
    secondLast: {
        type: String
    },
    address: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    phone2: {
        type: String
    },
    ssn: {
        type: String
    },
    dob: {
        type: Date
    },
    sex: {
        type: String
    },
    firstDay: {
        type: Date
    },
    numDays: {
        type: String
    },
    wage: {
        type: String
    },
    positions: {
        type: String
    },
    language: {
        type: String
    },
    i91: {
        type: String
    },
    i92: {
        type: String
    },
    idbadge: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = NewHire = mongoose.model('NewHire', newhireForm, 'NewHires' );