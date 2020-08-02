const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PsSchema = new Schema({
    ps: {
        type: String,
        required: true
    },
    dm: {
        type: String,
        required: true
    }, 
    district: {
        type: String,
        required: true
    },
    picture: {

    },
})

module.exports = Ps = mongoose.model('Ps', PsSchema, 'Managers');