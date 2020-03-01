const mongoose = require('mongoose');

var Schema = mongoose.Schema

const UserSchema = new Schema({
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
    operator: {
        type: Schema.ObjectId
    },
    group: {
        type: Number,
        required: [true, 'Please add group number']
    },
    session: {
        type: Schema.ObjectId
    },
    machineID: {
        type: String
    },
    salt: {
        type: String
    },
    hash: {
        type: String
    }
});

module.exports = mongoose.model('User', UserSchema);