const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
    title : {type: String, require: true},
    completed: { type: Boolean, default: false},
    createdAt: { type: Date, default: Date.now}
}

);

module.exports = mongoose.model('Task', taskSchema);