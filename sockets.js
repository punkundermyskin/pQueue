const Users = require('./models/User');
const Sessions = require('./models/Session');
const jwt = require('jsonwebtoken')

var sockets = {}

sockets.init = function (server) {
    var io = require('socket.io')(server);

    io.on('connection', function (socket) {
        var date = new Date();
        console.log('USER CONNECTED ', date.toGMTString())

        var role = 'guest'

        socket.on('getQueueInfo', async function (id) {
            const students = await Users.find({ session: id })
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

        socket.on('leaveSessionRoom', async function (token) {
            console.log('get leaveSessionRoom')
            role = await getRole(token)
            var user = socket.user
            if (!user) {
                socket.disconnect()
            } else {
                const room = user.session._id.toString()
                socket.leave(room);
                console.log(user.username, 'leave room :', room)
                user.status = undefined;
                user.session = undefined;
                user.host = undefined;
                user.save()
                socket.broadcast.to(room).emit('remove', user.id);
                console.log('send remove(leaveSessionRoom) to room ', room)
                socket.emit('remove', user.id);
                console.log('send remove(leaveSessionRoom) to user ', user.username)
            }
        })

        // STUDENT part !!!

        socket.on('joinLine', async function (token) {
            console.log('get joinLine')
            role = await getRole(token)
            var user = socket.user
            if (role != 'student', user.status != 'unready') {
                socket.disconnect()
            } else {
                user.status = 'inline'
                user.timeJoinQueue = Date.now()
                user.save()
                const room = user.session._id.toString() // DANGEROUS
                socket.to(room).emit('update', user);
                console.log('send update(joinLine) to room ', room)
                socket.emit('update', user);
                console.log('send update(joinLine) to user ', user.username)
            }
        })

        socket.on('leaveLine', async function (token) {
            console.log('get leaveLine')
            role = await getRole(token)
            var user = socket.user
            if (role != 'student', user.status != 'inline') {
                socket.disconnect()
            } else {
                const room = user.session._id.toString()
                user.status = 'unready'
                user.save()
                socket.to(room).emit('update', user);
                console.log('send update(leaveLine) to room ', room)
                socket.emit('update', user);
                console.log('send update(leaveLine) to user ', user.username)
            }
        })

        // OPERATORS part !!!

        socket.on('approveMember', async function (data) {
            console.log('get approveMember')
            const token = data.token
            const role = await getRole(token)
            const operator = socket.user
            var member = await Users.findOne({ _id: data.memberID })
            const session = await Sessions.findOne({ _id: operator.session._id })
            const owner = session.owner
            if (role == 'operator' && (operator.status != 'request' || owner._id.equals(operator._id)) &&
                operator.session._id.equals(member.session._id)) {
                member.status = 'unready'
                member.save()
                const room = operator.session._id.toString()
                socket.broadcast.to(room).emit('update', member);
                console.log('send update(leaveSessionRoom) to room ', room)
                socket.emit('update', member);
                console.log('send update(leaveSessionRoom) to user ', operator.username)
            } else {
                const message = "No access!" + Date.now()
                console.log('send error message')
                socket.emit('message', message);
            }
        })

        socket.on('freeOperator', async function (token) {
            console.log('get freeOperator')
            role = await getRole(token)
            var user = socket.user
            if (role == 'operator' || user.status == 'unready' || user.status == 'busy') {
                user.status = 'free'
                user.save()
                const room = user.session._id.toString() // DANGEROUS
                socket.to(room).emit('update', user);
                console.log('send update(freeOperator) to room ', room)
                socket.emit('update', user);
                console.log('send update(freeOperator) to user ', user.username)
            } else {
                const message = "No access!" + Date.now()
                console.log('send error message')
                socket.emit('message', message);
            }
        })

        socket.on('unreadyOperator', async function (token) {
            console.log('get unreadyOperator')
            role = await getRole(token)
            var user = socket.user
            if (role == 'operator' || user.status == 'free' || user.status == 'busy') {
                user.status = 'unready'
                user.save()
                const room = user.session._id.toString() // DANGEROUS
                socket.to(room).emit('update', user);
                console.log('send update(freeOperator) to room ', room)
                socket.emit('update', user);
                console.log('send update(freeOperator) to user ', user.username)
            } else {
                const message = "No access!" + Date.now()
                console.log('send error message')
                socket.emit('message', message);
            }
        })

        socket.on('requestStudentForProcess', async function (token) {
            console.log('get requestStudentForProcess')
            const role = await getRole(token)
            const operator = socket.user
            if (role == 'operator') { // && operator.status == 'free') {
                const studentsInline = await Users.
                    find({ session: operator.session._id, status: 'inline', role: 'student' })
                    .sort({ timeJoinQueue: 'descending' })
                var isFind = false
                const room = operator.session.toString()

                for (var i = studentsInline.length; i--;) {
                    var student = studentsInline[i]
                    if (!student.host || student.host._id.equals(operator._id)) {
                        student.host = operator._id
                        student.status = 'processing'
                        operator.status = 'busy'
                        student.save()
                        operator.save()
                        socket.broadcast.to(room).emit('update', student);
                        console.log('send update(requestStudentForProcess) student to room ', room)
                        socket.broadcast.to(room).emit('update', operator);
                        console.log('send update(requestStudentForProcess) operator to room ', room)
                        socket.emit('update', student);
                        console.log('send update(requestStudentForProcess) student to user ', operator.username)
                        socket.emit('update', operator);
                        console.log('send update(requestStudentForProcess) operator to user ', operator.username)
                        isFind = true
                        break
                    }
                }
                if (isFind === false) {
                    const message = "empty line" + Date.now()
                    console.log('send empty line')
                    socket.emit('message', message);
                }
            } else {
                const message = "No access!" + Date.now()
                console.log('send error message')
                socket.emit('message', message);
            }
        })

        socket.on('returnStudentToQueue', async function (token) {
            console.log('get returnStudentToQueue')
            role = await getRole(token)
            var operator = socket.user
            if (role == 'operator' || operator.status == 'busy') {
                const room = operator.session._id.toString() // DANGEROUS
                const hostID = operator._id.toString()
                var student = await Users.findOne({ session: room, status: 'processing', host: hostID })
                student.status = 'unready'
                // student.progress = 0.5 - TODO
                operator.status = 'unready'
                student.save()
                operator.save()
                socket.broadcast.to(room).emit('update', student);
                console.log('send update(returnStudentToQueue) student to room ', room)
                socket.broadcast.to(room).emit('update', operator);
                console.log('send update(returnStudentToQueue) operator to room ', room)
                socket.emit('update', student);
                console.log('send update(returnStudentToQueue) student to user ', operator.username)
                socket.emit('update', operator);
                console.log('send update(returnStudentToQueue) operator to user ', operator.username)
            } else {
                const message = "No access!" + Date.now()
                console.log('send error message')
                socket.emit('message', message);
            }
        })

        socket.on('finishServeringStudent', async function (token) {
            console.log('get finishServeringStudent')
            role = await getRole(token)
            var operator = socket.user
            if (role == 'operator' || operator.status == 'busy') {
                const room = operator.session._id.toString() // DANGEROUS
                const hostID = operator._id.toString()
                var student = await Users.findOne({ session: room, status: 'processing', host: hostID })
                student.status = 'done'
                // student.progress = 1 - TODO
                operator.status = 'unready'
                student.save()
                operator.save()
                socket.broadcast.to(room).emit('update', student);
                console.log('send update(finishServeringStudent) student to room ', room)
                socket.broadcast.to(room).emit('update', operator);
                console.log('send update(finishServeringStudent) operator to room ', room)
                socket.emit('update', student);
                console.log('send update(finishServeringStudent) student to user ', operator.username)
                socket.emit('update', operator);
                console.log('send update(finishServeringStudent) operator to user ', operator.username)
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
                const user = await Users.findOne({ _id: data._id })
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