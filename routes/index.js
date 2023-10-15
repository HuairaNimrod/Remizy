const express = require('express');
const routes =  express.Router();

routes.use('/', require('./swagger'));
routes.use('/operations', require('./operations'));

module.exports = routes;