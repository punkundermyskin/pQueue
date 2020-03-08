const mongoose = require('mongoose');

var Schema = mongoose.Schema

const SessionSchema = new mongoose.Schema({
    status: {
        type: String
        // required: [true, 'Please add a positive or negative number']
    },
    groups: {
        type: [Number]
    },
    operators: {
        type: [Schema.ObjectId]
    },
    timeLimit: {
        type: Date
    },
    createAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Session', SessionSchema);