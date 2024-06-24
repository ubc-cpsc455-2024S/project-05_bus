const mongoose = require('mongoose');

// create schema
const userSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    groupID: { type: String, required: true },
    // a security measure we may want to look into is hashing the password when we store it
});

// create model
const Users = mongoose.model('Users', userSchema);

module.exports = Users;