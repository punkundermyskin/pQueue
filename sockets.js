const Users = require('./models/User');
const Sessions = require('./models/Session');
const jwt = require('jsonwebtoken')

var sockets = {}

sockets.init = function (server) {
    var io = require('socket.io')(server);

    io.on('connection', function (socket) {
        console.log('USER CONNECTED')

        var role = 'guest'

        socket.on('getQueueInfo', async function (id) {
            const students = await Users.find({ session: id }).select('-password -tokens')
            const session = await Sessions.findOne({ _id: id })
            console.log('queueInfoToSocket!!!')
            socket.emit('queueInfo', {
                members: students,
                session: session
            });
        });

        socket.on('joinSessionRoom', async function (data) {
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

        socket.on('joinLine', async function (token) {
            role = await getRole(token)
            const user = socket.user
            if (role != 'student', user.status != 'unready') {
                socket.disconnect()
            } else {

                const updatedUser = await Users.findOneAndUpdate({ _id: user._id }, { $set: { status: 'inline' } }, { new: true }).select('-password -tokens')
                socket.to(room).emit('update', updatedUser);
            }
        })

        socket.on('leaveLine', async function (token) {
            role = await getRole(token)
            if (role != 'student', user.status != 'processing') {
                socket.disconnect()
            } else {
                const user = socket.user
                const updatedUser = await Users.findOneAndUpdate({ _id: user._id }, { $set: { status: 'unready' } }, { new: true }).select('-password -tokens')
                socket.to(room).emit('update', updatedUser);
            }
        })

        socket.on('leaveSessionRoom', async function (token) {
            role = await getRole(token)
            if (!user) {
                socket.disconnect()
            } else {
                const user = socket.user
                const room = user.session
                socket.leave(room);
                console.log('[socket]', 'leave room :', room)
                await Users.findOneAndUpdate({ _id: user._id }, { $set: { session: null, status: null } }, { new: true }).select('-password -tokens')
                socket.broadcast.to(room).emit('remove', user.id);
            }
        })

        // OPERATORS part !!!

        socket.on('approveMember', async function (data) {
            const token = data.token
            role = await getRole(token)
            const user = socket.user
            var member = await Users.findOne({ _id: data.memberID })
            const session = await Sessions.findOne({ _id: user.session._id })
            const owner = session.owner
            if (role != 'operator', user.status == 'request' && owner._id.toString() != user._id.toString(),
                user.session._id.toString() != member.session._id.toString()) {
                socket.disconnect()
            } else {
                const updatedMember = await Users.findOneAndUpdate({ _id: member._id },
                    { $set: { status: 'unready' } }, { new: true }).select('-password -tokens')
                const room = user.session._id.toString()
                socket.broadcast.to(room).emit('update', updatedMember);
            }
        })

        // Check auth

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