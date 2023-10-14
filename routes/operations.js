const express = require('express');
const router =  express.Router();

const operationController = require('../controllers/operations');

router.get('/', operationController.getOperations);
router.post('/', operationController.createOperation);

module.exports = router;