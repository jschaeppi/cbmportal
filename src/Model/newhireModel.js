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
    newHireNotes: {
        type: String
    },
    dob: {
        type: String
    },
    sex: {
        type: String
    },
    firstDay: {
        type: String
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
    hours: {

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
        type: String
    },
});

module.exports = NewHire = mongoose.model('NewHire', newhireForm, 'NewHires' );