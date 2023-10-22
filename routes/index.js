const express = require('express');
const routes =  express.Router();

routes.use('/', require('./swagger'));
routes.use('/operation', require('./operations'))

module.exports = routes;