const express = require('express');
const router = express.Router();
const { getUsers, deleteUser, getOperators } = require('../controllers/users');
// const { getUsers, deleteUser } = require('../controllers/users');
const usersAuth = require('../middleware/usersAuth')
const operatorsAuth = require('../middleware/operatorsAuth')

router
    .route('/')
    .get(usersAuth)
    .get(getUsers);

router
    .route('/operators')
    .get(usersAuth)
    .get(operatorsAuth)
    .get(getOperators);

router
    .route('/:id')
    .delete(usersAuth)
    .delete(deleteUser);

module.exports = router;