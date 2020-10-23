const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({

        userFirst: {
            type: String,
        },
        userLast: {
            type: String,
        },
        permission: {
            type: String,
        },
        email: {
            type: String, 
        },
        district: {
            type: String,
        },
        password: {
            type: String,
        },
        username: {
            type: String,
            unique: true
        },
        fullName: {
            type: String,
            unique: true
        },
});

module.exports = Users = mongoose.model('Users', userSchema, 'Users' );