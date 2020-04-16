const express = require('express');
const router = express.Router();
const { addUser, loginUser, userProfile } = require('../controllers/auth');
const usersAuth = require('../middleware/usersAuth')

router
    .route('/')
    .post(addUser);

router
    .route('/login')
    .post(loginUser);

router
    .route('/me')
    .get(usersAuth)
    .get(userProfile);

module.exports = router;