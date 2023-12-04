const express = require('express');
const router =  express.Router();

const recipients = require('../controllers/recipient');

router.get('/:id', recipients.getAllById);
router.post('/', recipients.createRecipient);


module.exports = router;