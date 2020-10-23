const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const wtForm = new Schema({

    employeeName: {
        type: String
    },
    employeeNum: {
        type: String
    },
    dm: {
        type: String
    },
    location: {
        type: String
    },
    city: {
        type: String
    }, 
    state: {
        type: String
    },
    workType: {
        type: String
    },
    Billable: {
        type: String
    },
    notes: {
        type: String
    },
    equipment: {
        type: String
    },
    currentLocation: {
        type: String
    },
    orderSubmitted: {
        type: String
    },
    orderDate: {
        type: String
    },
    orderNumber: {
        type: String
    },
    startDate: {
        type: String
    },
    endDate: {
        type: String
    },
    date: {
        type: String
    }
});

module.exports = WorkTicket = mongoose.model('WorkTicket', wtForm, 'WorkTicket' );