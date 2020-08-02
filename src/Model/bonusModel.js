const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bonusForm = new Schema({

        employeeName: {
            type: String,
        },
        employeeNum: {
            type: Number,
        },
        dm: {
            type: String, 
        },
        bonus: {
            type: Array,
        },
        comments: {
            type: String,
        },
});

module.exports = Bonus = mongoose.model('Bonus', bonusForm, 'Bonus' );