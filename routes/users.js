const express = require('express');
const router = express.Router();
const { getUsers, deleteUser } = require('../controllers/users');
const auth = require('../middleware/auth')

router
    .route('/')
    .get(getUsers);

router
    .route('/:id')
    .delete(deleteUser);

module.exports = router;