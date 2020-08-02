const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const hotelForm = new Schema({

        peopleNum: {
            type: String,
            required: true
        },
        roomNum: {
            type: String,
            required: true
        },
        store: {
            type: String,
            required: true
        },
        listPs1: {
            type: String, 
        },
        listPs2: {
            type: String,
        },
        checkOut: {
            type: String,
            required: true
        },
        checkIn: {
            type: String,
            required: true
        },
        notes: {
            type: String,
            required: true
        },
        hotelReason: {
            type: String,
            required: true
        },
        beds: {
            type: Number, 
            required: true
        },
        dm: {
            type: String,
            required: true
        },
        WT: {
            type: String,
            required: true
        },
        newPS: {
            type: String
        },
        Date: {
            type: Date,
            default: Date.now
        },
});

module.exports = Hotel = mongoose.model('Hotel', hotelForm, 'Hotels' );