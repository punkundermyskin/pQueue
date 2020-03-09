const express = require('express');
const router = express.Router();
const { getSessions, addSession, deleteSession } = require('../controllers/sessions');
const usersAuth = require('../middleware/usersAuth')
const operatorsAuth = require('../middleware/operatorsAuth')

router
    .route('/')
    .get(usersAuth)
    .get(getSessions);

router
    .route('/')
    .get(operatorsAuth)
    .post(addSession);

router
    .route('/:id')
    .get(operatorsAuth)
    .delete(deleteSession);

module.exports = router;