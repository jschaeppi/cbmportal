const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sessionSchema = new Schema({

        cookie: {
            type: Object,
        },
        user: {
            type: Object,
        },

});

module.exports = sessions = mongoose.model('sessions', sessionSchema, 'sessions' );