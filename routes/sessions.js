const express = require('express');
const router = express.Router();
const { getSessions, addSession, deleteSession, joinSession, getStudents, sessionStatus } = require('../controllers/sessions');
const usersAuth = require('../middleware/usersAuth')
const operatorsAuth = require('../middleware/operatorsAuth')
const sessionsAuth = require('../middleware/sessionsAuth')

router
    .route('/')
    .get(getSessions);

router
    .route('/')
    .post(usersAuth)
    .post(operatorsAuth)
    .post(addSession);

router
    .route('/:id')
    .post(usersAuth)
    .post(joinSession);

router
    .route('/:id/students')
    .get(usersAuth)
    .get(getStudents);

router
    .route('/:id')
    .delete(usersAuth)
    .delete(operatorsAuth)
    .delete(deleteSession);

module.exports = router;