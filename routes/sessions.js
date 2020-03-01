const express = require('express');
const router = express.Router();
const { getSessions, addSession, deleteSession } = require('../controllers/sessions');

router
    .route('/')
    .get(getSessions)
    .post(addSession);

router
    .route('/:id')
    .delete(deleteSession);

module.exports = router;