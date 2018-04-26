const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    title: {type: String, required: true},
    task: {type: String},
    done: {type: Boolean, default: false},
    created: {type: Date, default: Date.now},
    updated: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Task', TaskSchema);