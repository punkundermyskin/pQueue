const mongoose = require('mongoose');

var Schema = mongoose.Schema

const RequestSchema = new Schema({
    type: {
        type: String,
        trim: true
        // required: [true, 'Please add some text']
    },
    status: {
        type: Number
        // required: [true, 'Please add a positive or negative number']
    },
    student: {
        type: Schema.ObjectId,
        required: [true, 'Please add student ID']
    },
    operator: {
        type: Schema.ObjectId,
        required: [true, 'Please add operator ID']
    },
    session: {
        type: Schema.ObjectId,
        required: [true, 'Please add session ID']
    },
    createAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Request', RequestSchema);