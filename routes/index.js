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
  console.log('welcome');
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

routes.get('/transaction', requiresAuth(), async (req, res, next) => {

  // get email current user
  const user = JSON.stringify(req.oidc.user, null, 2);
  console.log(user);
  var userDetail = JSON.parse(user);
  //validate if user exists
  const currEmail = userDetail.email;
  console.log(currEmail);

  const apiUrl = `http://localhost:8080/users/email/${currEmail}`;
  const headers = {
    Accept: 'application/json'
  };
  try{
    const response = await axios.get(apiUrl, {headers});
    const users =response.data;
    console.log("asdasd "+ users.email);

    res.render('transaction', {
      title: "Operation"
    });
  }
  catch{
    console.log('errorrrrs');
  }
});

module.exports = routes;