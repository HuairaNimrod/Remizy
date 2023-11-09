const express = require('express');
const router =  express.Router();

const statusController = require('../controllers/status');

router.get('/', statusController.getTxstatus);
router.post('/', statusController.createTxstatus);
router.delete('/:id', statusController.deleteTxstatus);

module.exports = router;