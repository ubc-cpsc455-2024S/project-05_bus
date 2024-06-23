const mongoose = require('mongoose');

// create schema
const choreSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    colour: { type: String, required: true },
});

// create model
const Chores = mongoose.model('Chores', choreSchema);

module.exports = Chores;