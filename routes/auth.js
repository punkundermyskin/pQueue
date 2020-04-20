const express = require('express');
const router = express.Router();
const { addUser, loginUser, userProfile, updateUserMachineID } = require('../controllers/auth');
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
    .route('/update-machneid')
    .post(usersAuth)
    .post(updateUserMachineID);

module.exports = router;