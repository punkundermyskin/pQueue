const Users = require('./models/User');
const Sessions = require('./models/Session');

var sockets = {}

sockets.init = function (server) {
    var io = require('socket.io')(server);

    io.use(function(socket, next) {
        console.log('trying to auth')
        next();
    })
    io.on('connection', function (socket) {
        console.log('USER CONNECTED')
    
        socket.on('queueInfoToSocket', async function (data) {
            const students = await Users.find({ session: data.id }).select('-password -tokens')
            const session = await Sessions.findOne({ _id: data.id })

            socket.emit('queueInfo', {
                members: students,
                status: session.status
            });
        });
    
        socket.on('my other event', function (data) {
            console.log(data);
        });
    });
}

module.exports = sockets