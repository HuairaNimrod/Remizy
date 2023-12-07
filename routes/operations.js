const express = require('express');
const router =  express.Router();

const operations = require('../controllers/operations.js');

router.get('/', operations.getAll);
router.get('/:userId', operations.getOperations);
router.get('/find/:id', operations.getOperationsById);
router.post('/', operations.createOperation);
router.put('/:id', operations.updateOperation);
router.delete('/:id', operations.deleteOperation);

module.exports = router;