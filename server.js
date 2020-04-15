const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');

const auth = require('./routes/auth');
const users = require('./routes/users');
const sessions = require('./routes/sessions');

const sockets = require('./sockets')

const connectDB = require('./config/db');

dotenv.config({ path: './config/config.env' })

connectDB();

var app = require('express')();
var server = require('http').Server(app);

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

sockets.init(server)

server.listen(PORT, console.log(`Server running is ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));