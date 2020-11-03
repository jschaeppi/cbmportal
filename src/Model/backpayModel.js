const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const backpayForm = new Schema({

        employeeName: {
            type: String,
        },
        employeeNum: {
            type: String,
        },
        dm: {
            type: String, 
        },
        backpay: {
            type: Array,
        },
        comments: {
            type: String,
        },
        sig: {
            type: String,
        },
        date: {
            type: String
        }
});

module.exports = Backpay = mongoose.model('Backpay', backpayForm, 'Backpay' );