const Mongoose = require('mongoose');

const mongoDb = 'mongodb+srv://itsupport:IT5upp0rt@cbm-forms.jqkpv.mongodb.net/CBM-Forms?retryWrites=true&w=majority';

Mongoose.connect(mongoDb, {useNewUrlParser: true, useUnifiedTopology: true });

const db =  Mongoose.connection;

db.once('open', () => { console.log("MongoDB is connected")});
db.on('error', console.error.bind(console, 'MongoDB connection error'));

module.exports = db;