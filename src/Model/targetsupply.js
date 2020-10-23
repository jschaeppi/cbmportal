const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const targetSupplyForm = new Schema({

        location: {
            type: String,
        },
        employeeName: {
            type: String,
        },
        order: {
            type: Array,
        },
        notes: {
            type: String, 
        },
        dm: {
            type: String,
        },
        date: {
            type: Date
        }
});

module.exports = TargetSupply = mongoose.model('Target Supply', targetSupplyForm, 'TargetSupply' );