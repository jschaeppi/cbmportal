const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const StoreSchema = new Schema({
    banner: {
        type: String,
        required: true
    },
    store: {
        type: String,
        required: true
    }, 
})

module.exports = Stores = mongoose.model('Stores', StoreSchema, 'Stores');