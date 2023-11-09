const express = require('express');
const routes =  express.Router();
// const { auth } = require('express-openid-connect');
const { requiresAuth } = require('express-openid-connect');

const dotenv = require('dotenv');
dotenv.config();

routes.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Auth0 Webapp sample Nodejs',
    isAuthenticated: req.oidc.isAuthenticated()
  });

    if (req.oidc.isAuthenticated()){
      
      routes.use('/', require('./swagger'));
      routes.use('/operation', require('./operations'));
    }
  }
);

routes.get('/profile', requiresAuth(), function (req, res, next) {
  res.render('profile', {
    userProfile: JSON.stringify(req.oidc.user, null, 2),
    title: 'Profile page'
  });
});



module.exports = routes;