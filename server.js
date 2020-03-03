const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const connectDB = require('./config/db');

dotenv.config({ path: './config/config.env' })

connectDB();

const auth = require('./routes/auth');
const requests = require('./routes/requests');
const users = require('./routes/users');
const operators = require('./routes/operators');
const sessions = require('./routes/sessions');

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use('/api/requests', requests);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/operators', operators);
app.use('/api/sessions', sessions);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running is ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));
