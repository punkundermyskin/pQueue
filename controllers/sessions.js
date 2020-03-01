const Sessions = require('../models/Session');

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