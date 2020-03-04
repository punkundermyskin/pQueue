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
    password: {
        type: String,
        required: true,
        minLength: 7
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
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
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

UserSchema.statics.findByCredentials = async (username, password) => {
    // Search for a user by email and password.
    var User = mongoose.model('User', UserSchema);
    const user = await User.findOne({ username })
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