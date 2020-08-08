const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const departmentSchema = new Schema({

        department: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            default: Date.now
        },
});

module.exports = departments = mongoose.model('departmentSchema', departmentSchema, 'DepartmentEmails' );