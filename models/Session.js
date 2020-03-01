const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
    status: {
        type: String
        // required: [true, 'Please add a positive or negative number']
    },
    group: {
        type: Number
    },
    operators: {
        type: [String]
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