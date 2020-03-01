const express = require('express');
const router = express.Router();
const { getRequests, addRequest, deleteRequest } = require('../controllers/requests');

router
    .route('/')
    .get(getRequests)
    .post(addRequest);

router
    .route('/:id')
    .delete(deleteRequest);

module.exports = router;