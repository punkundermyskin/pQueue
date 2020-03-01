const Users = require('../models/User');

// @desc    Get all users
// @route   GET /api/users
// @access  Public
exports.getUsers = async (req, res, next) => {
    try {
        const users = await Users.find();

        return res.status(200).json({
            success: true,
            count: users.length,
            data: users
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        })
    }
}

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
// @access  Public
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

// @desc    Log out a  user
// @route   POST /api/users/me/logout
// @access  Public
exports.logoutUser = async (req, res, next) => {
    // Log user out of the application
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.status(200).json({
            success: true,
            data: {}
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

// @desc    Log out all clients for current user
// @route   POST /api/users/me/logout
// @access  Public
exports.logoutAllUser = async (req, res, next) => {
    // Log user out of the application
    try {
        req.user.tokens.splice(0, req.user.tokens.length)
        await req.user.save()
        res.status(200).json({
            success: true,
            data: {}
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

// @desc    Delete user
// @route   DELETE /api/users/;id
// @access  Public
exports.deleteUser = async (req, res, next) => {
    try {
        const user = await Users.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'No user found'
            });
        }

        await user.remove();

        return res.status(200).json({
            success: true,
            data: {}
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        })
    }
}