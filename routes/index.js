const express = require('express');
const routes =  express.Router();
// const { auth } = require('express-openid-connect');
const { requiresAuth } = require('express-openid-connect');
const user = require('./users');
const axios = require('axios');
const dotenv = require('dotenv');
const { createUser } = require('../controllers/user');
dotenv.config();

routes.use('/', require('./swagger'));
routes.use('/operation', require('./operations'));
routes.use('/status', require('./status'));
routes.use('/users', user);

routes.get('/',  async (req, res, next) => {
  const isLogged = req.oidc.isAuthenticated()
  console.log(isLogged);
  res.render('index', {
    title: 'Auth0 Webapp sample Nodejs',
    isAuthenticated: req.oidc.isAuthenticated()
  });
  if(isLogged){
        const user = JSON.stringify(req.oidc.user, null, 2);
        // console.log(user);
        var userDetail = JSON.parse(user);
        console.log(userDetail);
      //validate if user exists
        const currEmail = userDetail.email;
        // console.log(currEmail);

      const apiUrl = `http://localhost:8080/users/email/${currEmail}`;
      const headers = {
        Accept: 'application/json'
      };
      
       try{
        const response = await axios.get(apiUrl, {headers});
        const users =response.data;
        console.log("asdasd "+ users.email);
      }
      catch{
        const hasEmail = false;
        console.log(hasEmail);
        console.log("creating user");
        console.log(userDetail.email);


        try {
          const response = await axios.post('http://localhost:8080/users', {
            // Data to be sent to the server
            email: userDetail.email,
            venmoUser: '',
            nickname: userDetail.nickname,
          });
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
        
      }
  }
  }
);

routes.get('/profile', requiresAuth(), async (req, res, next) => {


  const user = JSON.stringify(req.oidc.user, null, 2);
  var userDetail = JSON.parse(user);
  const currEmail = userDetail.email;
  
  const apiUrl = `http://localhost:8080/users/email/${currEmail}`;
  const headers = {
    Accept: 'application/json',
  };
  const response = await axios.get(apiUrl, {headers});
  const usersInfo = response.data;
    
    res.render('profile', {
      userProfile: JSON.stringify(req.oidc.operation, null, 2),
      title: 'Profile page',
      usersInfo
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
    const hasEmail = true;
    res.render('transaction', {
      title: "Operation",
      hasEmail
    });
  }
  catch{
    const hasEmail = false;
    console.log(hasEmail);
    res.render('transaction', {
      title: "Operation",
      hasEmail
    });
  }
});

module.exports = routes;