const express = require('express');
const router = express.Router();
const { getOperators, addOperator, deleteOperator } = require('../controllers/operators');

router
    .route('/')
    .get(getOperators)
    .post(addOperator);

router
    .route('/:id')
    .delete(deleteOperator);

module.exports = router;