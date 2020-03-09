const express = require('express');
const router = express.Router();
const { addUser, loginUser, userProfile, logoutUser, logoutAllUser } = require('../controllers/auth');
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

router
    .route('/me/logout')
    .post(usersAuth)
    .post(logoutUser)

router
    .route('/me/logoutall')
    .post(usersAuth)
    .post(logoutAllUser)

module.exports = router;