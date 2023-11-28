const express = require('express');
const router =  express.Router();

const users = require('../controllers/user.js');

router.get('/:id', users.findById);
router.post('/', users.createUser);
router.put('/:id', users.updateUser);

module.exports = router;