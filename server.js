const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');

const auth = require('./routes/auth');
const users = require('./routes/users');
const sessions = require('./routes/sessions');

const connectDB = require('./config/db');

dotenv.config({ path: './config/config.env' })

connectDB();

var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/sessions', sessions);


if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

const PORT = process.env.PORT || 5000;

// app.listen(PORT, console.log(`Server running is ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));

// io.on('connection', function (socket) {
//     socket.emit('queueLengthToSocket', {
//         queueLength: 1,
//         positionInLine: 1
//     });
//     socket.on('my other event', function (data) {
//         console.log(data);
//     });
//     console.log("123")
// });

io.on('connection', function (socket) {
    console.log('a user connected');
});

server.listen(PORT, console.log(`Server running is ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));