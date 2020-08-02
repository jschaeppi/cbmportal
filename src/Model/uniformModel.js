const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const uniformForm = new Schema({

    employeeNum: {
        type: Number
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    address: {
        type: String
    }, 
    apt: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    zip: {
        type: Number
    },
    cost: {
        type: Number
    }, 
    quantity: {
        type: Number
    },
    size: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = Uniform = mongoose.model('Uniform', uniformForm, 'Uniforms' );