const Users = require('../models/User');
var ObjectId = require('mongoose').Types.ObjectId;

const sessionsAuth = async (req, res, next) => {
    try {
        var id = req.params.id

        const user = req.user

        const sessionId = user.session._id.toString()
        if (id != sessionId) {
            throw new Error()
        }

        next()
    } catch (err) {
        return res.status(401).json({
            success: false,
            error: 'Not authorized to access this resource'
        })
    }

}
module.exports = sessionsAuth