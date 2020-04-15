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
            console.log('get QueueInfo request ')
            socket.emit('queueInfo', {
                members: students,
                session: session
            });
            console.log('send QueueInfo')
        });

        socket.on('joinSessionRoom', async function (data) {
            console.log('get joinSessionRoom')
            const room = data.id
            const token = data.token
            role = await getRole(token)
            if (role == 'guest') {
                socket.disconnect()
            } else {
                const user = socket.user
                // const sessionId = user.session._id.toString()
                socket.join(room, function () {
                    console.log(user.username + " now in rooms ", room);
                });

                socket.to(room).emit('update', user);
                console.log('send update(joinSessionRoom) to room ', room)
            }
        })

        socket.on('joinLine', async function (token) {
            console.log('get joinLine')
            role = await getRole(token)
            const user = socket.user
            if (role != 'student', user.status != 'unready') {
                socket.disconnect()
            } else {
                const updatedUser = await Users.findOneAndUpdate({ _id: user._id }, { $set: { status: 'inline' } }, { new: true }).select('-password -tokens')
                const room = user.session._id.toString() // DANGEROUS
                socket.to(room).emit('update', updatedUser);
                console.log('send update(joinLine) to room ', room)
                socket.emit('update', updatedUser);
                console.log('send update(joinLine) to user ', user.username)
            }
        })

        socket.on('leaveLine', async function (token) {
            console.log('get leaveLine')
            role = await getRole(token)
            const user = socket.user
            if (role != 'student', user.status != 'processing') {
                socket.disconnect()
            } else {
                const user = socket.user
                const room = user.session._id.toString()
                const updatedUser = await Users.findOneAndUpdate({ _id: user._id }, { $set: { status: 'unready' } }, { new: true }).select('-password -tokens')
                socket.to(room).emit('update', updatedUser);
                console.log('send update(leaveLine) to room ', room)
                socket.emit('update', updatedUser);
                console.log('send update(leaveLine) to user ', user.username)
            }
        })

        socket.on('leaveSessionRoom', async function (token) {
            console.log('get leaveSessionRoom')
            role = await getRole(token)
            const user = socket.user
            if (!user) {
                socket.disconnect()
            } else {
                const user = socket.user
                const room = user.session._id.toString()
                socket.leave(room);
                console.log(user.username, 'leave room :', room)
                await Users.findOneAndUpdate({ _id: user._id }, { $set: { session: null, status: null } }, { new: true }).select('-password -tokens')
                socket.broadcast.to(room).emit('remove', user.id);
                console.log('send remove(leaveSessionRoom) to room ', room)
                socket.emit('remove', user.id);
                console.log('send remove(leaveSessionRoom) to user ', user.username)
            }
        })

        // OPERATORS part !!!

        socket.on('approveMember', async function (data) {
            console.log('get approveMember')
            const token = data.token
            const role = await getRole(token)
            const user = socket.user
            var member = await Users.findOne({ _id: data.memberID })
            const session = await Sessions.findOne({ _id: user.session._id })
            const owner = session.owner
            if (role == 'operator' && (user.status != 'request' || owner._id.toString() == user._id.toString()) &&
                user.session._id.toString() == member.session._id.toString()) {
                const updatedMember = await Users.findOneAndUpdate({ _id: member._id },
                    { $set: { status: 'unready' } }, { new: true }).select('-password -tokens')
                const room = user.session._id.toString()
                socket.broadcast.to(room).emit('update', updatedMember);
                console.log('send update(leaveSessionRoom) to room ', room)
                socket.emit('update', updatedMember);
                console.log('send update(leaveSessionRoom) to user ', user.username)
            } else {
                const message = "No access!" + Date.now()
                console.log('send error message')
                socket.emit('message', message);
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
                console.log('auth success')
            } catch (error) {
                console.log('auth error')
                role = 'guest'
            }
            return role
        }

    });
}

module.exports = sockets