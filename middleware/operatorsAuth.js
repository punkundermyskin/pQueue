const jwt = require('jsonwebtoken')
const User = require('../models/User')

const operatorsAuth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const data = jwt.verify(token, process.env.JWT_KEY)
        const user = await User.findOne({ _id: data._id, 'tokens.token': token })
        if (!user || user.role !== 'operator') {
            throw new Error()
        }
        req.user = user
        next(data)
    } catch (err) {
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);

            return res.status(400).json({
                success: false,
                error: messages
            });
        }
        // if (err.name === 'TokenExpiredError') {

        // }
        else {
            return res.status(401).json({
                success: false,
                error: 'Not authorized to access this resource'
            })
        }
    }

}
module.exports = operatorsAuth