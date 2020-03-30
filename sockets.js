const Users = require('./models/User');
const Sessions = require('./models/Session');
const jwt = require('jsonwebtoken')

var sockets = {}

sockets.init = function (server) {
    var io = require('socket.io')(server);

    io.on('connection', function (socket) {
        console.log('USER CONNECTED')

        var role = 'guest'

        socket.on('queueInfoToSocket', async function (data) {
            const students = await Users.find({ session: data.id }).select('-password -tokens')
            const session = await Sessions.findOne({ _id: data.id })
            console.log('queueInfoToSocket!!!')
            socket.emit('queueInfo', {
                members: students,
                status: session.status
            });
        });

        socket.on('join', async function (data) {
            const token = socket.handshake.query.token
            role = await getRole(token)
            if (role == 'guest') {
                socket.disconnect()
            } else {
                const user = socket.user
                const sessionId = user.session._id.toString()
                socket.join('room1', function () {
                    console.log(socket.id + " now in rooms ", socket.rooms);
                });

                socket.to('room1').emit('update', user);
            }
        })

        async function getRole(token) {
            try {
                const data = jwt.verify(token, process.env.JWT_KEY)
                const user = await Users.findOne({ _id: data._id, 'tokens.token': token }).select('-password -tokens')
                if (!user) {
                    throw new Error()
                }
                socket.user = user
                role = user.role
            } catch (error) {
                role = 'guest'
            }
            return role
        }

    });
}

module.exports = sockets