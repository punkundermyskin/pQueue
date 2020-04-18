const mongoose = require('mongoose');

var Schema = mongoose.Schema

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
    owner: {
        type: Schema.Types.ObjectId, ref: 'User'
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
    },
    minutesForRequest: {
        type: Number,
        required: [true, 'Please add some minutes for request']
    },
});

module.exports = mongoose.model('Session', SessionSchema);