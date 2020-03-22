
const operatorsAuth = async (req, res, next) => {
    try {
        const user = req.user
        if (user.role !== 'operator') {
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
module.exports = operatorsAuth