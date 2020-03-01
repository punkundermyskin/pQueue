const Requests = require('../models/Request');

// @desc    Get all requests
// @route   GET /api/requests
// @access  Public
exports.getRequests = async (req, res, next) => {
    try {
        const requests = await Requests.find();

        return res.status(200).json({
            success: true,
            count: requests.length,
            data: requests
        });
    } catch (err) {
        return res.status(500).jsong({
            success: false,
            error: 'Server Error'
        })
    }
}

// @desc    Post request
// @route   POST /api/requests
// @access  Public
exports.addRequest = async (req, res, next) => {
    try {
        const { text, amount } = req.body;

        const request = await Requests.create(req.body);

        return res.status(201).json({
            success: true,
            data: request
        })
    } catch (err) {
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);

            return res.status(400).json({
                success: false,
                error: messages
            });
        } else {
            return res.status(500).jsong({
                success: false,
                error: 'Server Error'
            })
        }
    }
}

// @desc    Delete request
// @route   DELETE /api/requests/;id
// @access  Public
exports.deleteRequest = async (req, res, next) => {
    try {
        const request = await Requests.findById(req.params.id);

        if (!request) {
            return res.status(404).json({
                success: false,
                error: 'No request found'
            });
        }

        await request.remove();

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