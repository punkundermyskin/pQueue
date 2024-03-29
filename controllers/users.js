const Users = require('../models/User');

// @desc    Get all users
// @route   GET /api/users
// @access  Public
exports.getUsers = async (req, res, next) => {
    try {
        const users = await Users.find()

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

// @desc    Get all operators
// @route   GET /api/users/operatos
// @access  Protected
exports.getOperators = async (req, res, next) => {
    try {
        const operators = await Users.find({ 'role': 'operator' })

        return res.status(200).json({
            success: true,
            count: operators.length,
            data: operators
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        })
    }
}

// @desc    Delete user
// @route   DELETE /api/users/;id
// @access  Protected
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