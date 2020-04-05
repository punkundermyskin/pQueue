const Sessions = require('../models/Session');
const Users = require('../models/User');
const jwt = require('jsonwebtoken')

// @desc    Get all sessions
// @route   GET /api/sessions
// @access  Public
exports.getSessions = async (req, res, next) => {
    try {
        const sessions = await Sessions.find();

        return res.status(200).json({
            success: true,
            count: sessions.length,
            data: sessions
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        })
    }
}

// @desc    Post session
// @route   POST /api/sessions
// @access  Public
exports.addSession = async (req, res, next) => {
    try {
        const { text, amount } = req.body;

        const session = await Sessions.create(req.body);

        return res.status(201).json({
            success: true,
            data: session
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

// @desc    Join session
// @route   POST /api/sessions
// @access  Public
exports.joinSession = async (req, res, next) => {
    try {
        var id = req.params.id;

        const token = req.header('Authorization').replace('Bearer ', '')
        const data = jwt.verify(token, process.env.JWT_KEY)

        const updatedUser = await Users.findOneAndUpdate({ _id: data._id }, { $set: { session: id, status: 'request' } }, { new: true })

        return res.status(201).json({
            success: true,
            // data: user
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

// @desc    Join session
// @route   POST /api/sessions
// @access  Public
exports.sessionStatus = async (req, res, next) => {
    try {

        return res.status(201).json({
            success: true,
            // data: user
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

// @desc    Join session
// @route   POST /api/sessions
// @access  Public
exports.getStudents = async (req, res, next) => {
    try {

        var id = req.params.id;
        const students = await Users.find({ session: id }).select('-password -tokens');

        return res.status(201).json({
            success: true,
            data: students
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

// @desc    Delete session
// @route   DELETE /api/sessions/;id
// @access  Public
exports.deleteSession = async (req, res, next) => {
    try {
        const session = await Sessions.findById(req.params.id);

        if (!session) {
            return res.status(404).json({
                success: false,
                error: 'No session found'
            });
        }

        await session.remove();

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