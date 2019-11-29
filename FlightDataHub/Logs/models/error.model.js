const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ErrorSchema = new Schema({

    ERROR: { type: String, required: false},
    DESCRIPTION: { type: String, required: false }
   
});

module.exports = mongoose.model('Error', ErrorSchema);