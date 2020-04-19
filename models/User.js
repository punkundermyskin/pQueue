const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

var Schema = mongoose.Schema

const UserSchema = new Schema({
    username: {
        type: String,
        trim: true,
        unique: true,
        lowercase: true,
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
        // type: Schema.ObjectId
        type: Schema.Types.ObjectId, ref: 'Session'
    },
    role: {
        type: String,
        enum: ['student', 'operator'],
        default: 'student'
    },
    group: {
        type: Number,
        required: function () { return this.role === 'student'; }
    },
    machineID: {
        type: String,
        required: function () { return this.role === 'student'; }
    },
    host: {
        type: Schema.ObjectId
    },
    hostName: {
        type: String
    },
    status: {
        type: String,
        enum: ['request', 'unready', 'inline', 'processing', 'done',
            'free', 'busy', 'leave']
    },
    timeJoinQueue: {
        type: Date,
    },
    startProcessingTime: {
        type: Date,
    },
    progress: {
        type: Number
    },
    password: {
        type: String,
        required: true,
        minLength: 7,
        select: false
    }
});

UserSchema.pre('save', async function (next) {
    // Hash the password before saving the user model
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

UserSchema.methods.generateAuthToken = async function () {
    // Generate an auth token for the user
    const user = this
    const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY, {
        expiresIn: "1h"
    })
    return token
}

UserSchema.statics.findByCredentials = async (username, password) => {
    // Search for a user by email and password.
    var User = mongoose.model('User', UserSchema);
    const user = await User.findOne({ username }).select('+password')
    if (!user) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    return user
}

module.exports = mongoose.model('User', UserSchema);