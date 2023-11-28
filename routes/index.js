const express = require('express');
const routes =  express.Router();
// const { auth } = require('express-openid-connect');
const { requiresAuth } = require('express-openid-connect');
const user = require('./users');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

routes.use('/', require('./swagger'));
routes.use('/operation', require('./operations'));
routes.use('/status', require('./status'));
routes.use('/users', user);
routes.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Auth0 Webapp sample Nodejs',
    isAuthenticated: req.oidc.isAuthenticated()
  });
  }
);

routes.get('/profile', requiresAuth(), async (req, res, next) => {
      
  const apiUrl = 'http://localhost:8080/operation';
  const headers = {
    Accept: 'application/json'
  };
  const response = await axios.get(apiUrl, {headers});
  const allOperations = response.data;
    
    res.render('profile', {
      userProfile: JSON.stringify(req.oidc.operation, null, 2),
      title: 'Profile page',
      allOperations
    });
  
});



module.exports = routes;