const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    title: {type: String, required: true}, // title of task
    task: {type: String}, // task contents
    status: {type: String, default: 'In Progress'}, // task status
    priority_level: {type: String, default: 'Normal'},
    created: {type: Date, default: Date.now}, // created date
    updated: {type: Date, default: Date.now} // updated date
});

module.exports = mongoose.model('Task', TaskSchema);