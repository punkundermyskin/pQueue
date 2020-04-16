const Users = require('../models/User');

// @desc    Create user
// @route   POST /api/users
// @access  Public
exports.addUser = async (req, res, next) => {
    try {
        const user = await Users.create(req.body);
        await user.save()
        const token = await user.generateAuthToken()

        return res.status(201).json({
            success: true,
            token: token,
            data: user
        })
    } catch (err) {
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);

            return res.status(400).json({
                success: false,
                error: messages
            });
        } else {
            return res.status(500).json({
                success: false,
                error: 'Server Error'
            })
        }
    }
}

// @desc    Login a registered user
// @route   POST /api/users/login
// @accsess  Public
exports.loginUser = async (req, res, next) => {
    try {
        const { username, password } = req.body
        const user = await Users.findByCredentials(username, password)
        if (!user) {
            return res.status(401).json({
                success: false,
                error: 'Login failed! Check authentication credentials'
            })
        }
        const token = await user.generateAuthToken()
        return res.status(200).json({
            success: true,
            token: token,
            data: user
        });
    } catch (err) {
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);

            return res.status(400).json({
                success: false,
                error: messages
            });
        } else {
            return res.status(500).json({
                success: false,
                error: 'Server Error'
            })
        }
    }
}

// @desc    Login a registered user
// @route   POST /api/users/me
// @access  Public
exports.userProfile = async (req, res, next) => {
    // View logged in user profile
    // res.send(req.user)
    res.status(200).json({
        success: true,
        data: req.user
    });
}