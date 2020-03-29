const Users = require('./models/User');
const Sessions = require('./models/Session');
const jwt = require('jsonwebtoken')

var sockets = {}

sockets.init = function (server) {
    var io = require('socket.io')(server);

    io.on('connection', function (socket) {
        console.log('USER CONNECTED')

        socket.on('queueInfoToSocket', async function (data) {

            io.use((socket, next) => {
                try {
                    let token = socket.handshake.query.token;
                    jwt.verify(token, process.env.JWT_KEY)
                    return next();
                } catch (error) {
                    // socket.disconnect(true);
                    return next(new Error('authentication error'));
                }
            });

            const students = await Users.find({ session: data.id }).select('-password -tokens')
            const session = await Sessions.findOne({ _id: data.id })
            console.log('queueInfoToSocket!!!')
            socket.emit('queueInfo', {
                members: students,
                status: session.status
            });
        });
    });
}

module.exports = sockets