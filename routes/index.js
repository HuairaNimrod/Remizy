const express = require('express');
const routes =  express.Router();

router.use('/', require('./swagger'));
routes.use('/operations', require('./operations'));

module.exports = routes;