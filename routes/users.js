const express = require('express');
const router = express.Router();
const { getUsers, addUser, deleteUser, loginUser, userProfile, logoutUser, logoutAllUser } = require('../controllers/users');
const auth = require('../middleware/auth')

router
    .route('/')
    .get(getUsers)
    .post(addUser);

router
    .route('/:id')
    .delete(deleteUser);

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