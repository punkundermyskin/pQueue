const mongoose = require('mongoose');

// var Schema = mongoose.Schema

const SessionSchema = new mongoose.Schema({
    status: {
        type: String,
        required: [true, 'Please add a positive or negative number']
    },
    subject: {
        type: String,
        required: [true, 'Please add a subject']
    },
    office: {
        type: String,
        required: [true, 'Please add a office']
    },
    groups: {
        type: [Number],
        // required: [true, 'Please add a groups']
    },
    start: {
        type: Date,
        default: Date.now
    },
    end: {
        type: Date,
    }
});

module.exports = mongoose.model('Session', SessionSchema);