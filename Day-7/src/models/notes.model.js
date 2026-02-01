const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: String,
    description : String,
    age: Number,
    name: String

})
const noteModel = mongoose.model('notes', noteSchema);
module.exports = noteModel;