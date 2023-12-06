const express = require('express');
const router =  express.Router();

const operations = require('../controllers/operations.js');

router.get('/:sender', operations.getOperations);
router.post('/', operations.createOperation);
router.put('/:id', operations.updateOperation);
router.delete('/:id', operations.deleteOperation);

module.exports = router;