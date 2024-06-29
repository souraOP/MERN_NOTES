const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//creating the notes schema
const noteSchema = new Schema({
    title: { type: String, required: true},
    content: { type: String, required: true},
    isPinned: { type: Boolean, default: false},
    tags: {type: [String], default: []},
    userId: { type: String, required: true},
    createdOn: { type: Date, default: new Date().getTime()},
});

module.exports = mongoose.model("Note", noteSchema);