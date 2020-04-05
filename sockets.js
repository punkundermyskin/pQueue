const Users = require('./models/User');
const Sessions = require('./models/Session');
const jwt = require('jsonwebtoken')

var sockets = {}

sockets.init = function (server) {
    var io = require('socket.io')(server);

    io.on('connection', function (socket) {
        console.log('USER CONNECTED')

        var role = 'guest'

        socket.on('queueInfoToSocket', async function (id) {
            const students = await Users.find({ session: id }).select('-password -tokens')
            const session = await Sessions.findOne({ _id: id })
            console.log('queueInfoToSocket!!!')
            socket.emit('queueInfo', {
                members: students,
                session: session
            });
        });

        socket.on('join', async function (data) {
            const room = data.id
            const token = data.token
            role = await getRole(token)
            if (role == 'guest') {
                socket.disconnect()
            } else {
                const user = socket.user
                const sessionId = user.session._id.toString()
                socket.join(room, function () {
                    console.log(socket.id + " now in rooms ", socket.rooms);
                });

                socket.to(room).emit('update', user);
            }
        })

        socket.on('leave', async function (room) {
            console.log('[socket]', 'leave room :', room)
            socket.leave(room);
            const user = socket.user
            await Users.findOneAndUpdate({ _id: user._id }, { $set: { session: null, status: null } }, { new: true })
            socket.to(room).emit('remove', user.id);
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