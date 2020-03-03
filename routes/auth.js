const express = require('express');
const router = express.Router();
const { addUser, loginUser, userProfile, logoutUser, logoutAllUser } = require('../controllers/auth');
const auth = require('../middleware/auth')

router
    .route('/')
    .post(addUser);

router
    .route('/login')
    .post(loginUser);

router
    .route('/me')
    .get(auth)
    .get(userProfile);

router
    .route('/me/logout')
    .post(auth)
    .post(logoutUser)

router
    .route('/me/logoutall')
    .post(auth)
    .post(logoutAllUser)

module.exports = router;