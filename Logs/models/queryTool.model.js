const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let QueryToolSchema = new Schema({

    USER: { type: String, required: false},
    TASK: { type: String, required: false },
    DESCRIPTION: { type: String, required: false }

});

module.exports = mongoose.model('QueryTool', QueryToolSchema);