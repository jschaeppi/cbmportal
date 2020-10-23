const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const termForm = new Schema({

    employeeNum: {
        type: String
    },
    firstName: {
        type: String
    },
    dm: {
        type: String
    },
    firstLast: {
        type: String
    }, 
    secondLast: {
        type: String
    },
    rehire: {
        type: String
    },
    norehireReason: {
        type: String
    },
    lastWorked: {
        type: String
    },
    twoWeeks: {
        type: String
    },
    warnings: {
        type: String
    },
    date: {
        type: String
    },
});

module.exports = Term= mongoose.model('Term', termForm, 'Term' );