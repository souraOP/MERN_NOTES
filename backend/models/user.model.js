const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// creating the user schema
const userSchema = new Schema({
    fullName: { type: String},
    email: { type: String},
    password: { type: String},
    createdOn: { type: Date, default: new Date().getTime()},
});

module.exports = mongoose.model("User", userSchema); 