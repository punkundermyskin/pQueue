const mongoose = require('mongoose');

var Schema = mongoose.Schema

const OperatorSchema = new Schema({
    username: {
        type: String,
        trim: true,
        required: [true, 'Please add username']
    },
    firstName: {
        type: String,
        trim: true,
        required: [true, 'Please add first name']
    },
    lastName: {
        type: String,
        trim: true,
        required: [true, 'Please add last name']
    },
    session: {
        type: Schema.ObjectId,
    },
    salt: {
        type: String
    },
    hash: {
        type: String
    }
});

module.exports = mongoose.model('Operator', OperatorSchema);