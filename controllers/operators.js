const Operators = require('../models/Operator');

// @desc    Get all operators
// @route   GET /api/operators
// @access  Public
exports.getOperators = async (req, res, next) => {
    try {
        const operators = await Operators.find();

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

// @desc    Post operator
// @route   POST /api/operators
// @access  Public
exports.addOperator = async (req, res, next) => {
    try {
        const { text, amount } = req.body;

        const operator = await Operators.create(req.body);

        return res.status(201).json({
            success: true,
            data: operator
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

// @desc    Delete operator
// @route   DELETE /api/operators/;id
// @access  Public
exports.deleteOperator = async (req, res, next) => {
    try {
        const operator = await Operators.findById(req.params.id);

        if (!operator) {
            return res.status(404).json({
                success: false,
                error: 'No operator found'
            });
        }

        await operator.remove();

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