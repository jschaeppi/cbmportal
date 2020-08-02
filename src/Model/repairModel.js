const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const repairForm = new Schema({

        location: {
            type: String,
        },
        brandName: {
            type: String,
        },
        machineType: {
            type: String,
        },
        machineTag: {
            type: String, 
        },
        problem: {
            type: String,
        },
        repotedBy: {
            type: String,
        },
        picture: {
            type: String,
        },
});

module.exports = Repair = mongoose.model('Repair', repairForm, 'Repairs' );