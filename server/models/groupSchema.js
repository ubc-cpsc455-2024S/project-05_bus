const mongoose = require('mongoose');

// create schema
const groupSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    memberIDs: { type: [String], required: true },
});

// create model
const Groups = mongoose.model('Groups', groupSchema);

module.exports = Groups;