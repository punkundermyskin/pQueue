const express = require('express');
const router = express.Router();
const { getSessions, addSession, deleteSession, joinSession, getStudents } = require('../controllers/sessions');
const usersAuth = require('../middleware/usersAuth')
const operatorsAuth = require('../middleware/operatorsAuth')

router
    .route('/')
    // .get(usersAuth)
    .get(getSessions);

router
    .route('/')
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
    .delete(operatorsAuth)
    .delete(deleteSession);

module.exports = router;