const Mongoose = require('mongoose');

const mongoDb = process.env['dbConnection'];

Mongoose.connect(mongoDb, {useNewUrlParser: true, useUnifiedTopology: true, autoIndex: false });

const db =  Mongoose.connection;

db.once('open', () => { console.log("MongoDB is connected")});
db.on('error', console.error.bind(console, 'MongoDB connection error'));

module.exports = db;