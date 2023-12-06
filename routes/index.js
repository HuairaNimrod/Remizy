const express = require('express');
const app = express();
const routes =  express.Router();
// const { auth } = require('express-openid-connect');
const { requiresAuth } = require('express-openid-connect');
const user = require('./users');
const operation = require('./operations');
const recipient = require('./recipients');
const models = require('../models')
const axios = require('axios');
const dotenv = require('dotenv');
const { createUser } = require('../controllers/user');
dotenv.config();

const bodyParser = require('body-parser');

routes.use(bodyParser.urlencoded({ extended: true }));
routes.use('/', require('./swagger'));
routes.use('/operations', operation);
routes.use('/status', require('./status'));
routes.use('/users', user);
routes.use('/recipients', recipient);

routes.get('/',  async (req, res, next) => {
  const isLogged = req.oidc.isAuthenticated()
  const hasOperations = false
  console.log(isLogged);
  console.log(hasOperations);
  
  
  if(isLogged){
        const user = JSON.stringify(req.oidc.user, null, 2);
        var userDetail = JSON.parse(user);// console.log(user);
        console.log(userDetail); //validate if user exists
        const currEmail = userDetail.email;
        
       try{

              const apiUrl = `http://localhost:8080/users/email/${currEmail}`;
              const headers = {
                                Accept: 'application/json'
                              };
              const response = await axios.get(apiUrl, {headers});
              const users =response.data;
              app.locals.usersId = users._id; //setting the users_id as in locals
              app.locals.userVenmo = users.venmoUser // venmoUser in locals
              console.log("asdasd "+ users.email);
              console.log("venmo users: "+ users.venmoUser);
              console.log(users);

              if(app.locals.userVenmo!=""){
        
                      //populate the main page
                    try {
                                console.log('--------:(');
                                console.log(app.locals.userVenmo);
                                console.log('--------:(');
                                const responseOperations = await axios.get(`http://localhost:8080/operations/${app.locals.userVenmo}`);
                                // console.log(responseOperations.data);
                                const transfers = responseOperations.data;
                                console.log(':)');
                                console.log(transfers);
                                const hasOperations = true;
                                res.render('index', {
                                  title: 'Auth0 Webapp sample Nodejs',
                                  isAuthenticated: req.oidc.isAuthenticated(),
                                  transfers,
                                  hasOperations
                                });



                      } catch{
                                console.log(" saddddd ");
                                res.redirect('/profile');
                              }
              }else{
                      
                      const hasOperations= false;
                      res.render('index', {
                        title: 'Auth0 Webapp sample Nodejs',
                        isAuthenticated: req.oidc.isAuthenticated(),
                        hasOperations
                      });
              }


        }catch{
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
                      const users = response.data;
                      const hasOperations= false;

                      res.render('index', {
                        title: 'Auth0 Webapp sample Nodejs',
                        isAuthenticated: req.oidc.isAuthenticated(),
                        hasOperations
                      });
                    } catch (error) {
                      console.error(error);
                    }
                
        }        
      }
  else{
        //logout logic
        res.render('index', {
          title: 'Auth0 Webapp sample Nodejs',
          isAuthenticated: req.oidc.isAuthenticated()
        });
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
  console.log('profile ');
  console.log(usersInfo);
    
    res.render('profile', {
      userProfile: JSON.stringify(req.oidc.operation, null, 2),
      title: 'Profile page',
      usersInfo
    });
  
});

routes.get('/profileedit', requiresAuth(), async (req, res, next) => {


  const user = JSON.stringify(req.oidc.user, null, 2);
  var userDetail = JSON.parse(user);
  const currEmail = userDetail.email;
  
  const apiUrl = `http://localhost:8080/users/email/${currEmail}`;
  const headers = {
    Accept: 'application/json',
  };
  const response = await axios.get(apiUrl, {headers});
  const usersInfo = response.data;
  console.log('profileedit ');
  console.log(usersInfo);
    
    res.render('profileedit', {
      userProfile: JSON.stringify(req.oidc.operation, null, 2),
      title: 'Profileedit page',
      usersInfo
    });
  
});

routes.post('/updateUsers/:id', requiresAuth(), async (req, res) => {


      try {
        const response = await axios.put(`http://localhost:8080/users/${req.params.id}`, req.body.users);
        console.log(response.data);
        res.redirect('/profile');
      } catch (error) {
        console.error(error);
      }
})



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
    const responseRecipients = await axios.get(`http://localhost:8080/recipients/${users._id}`);
    const recipientList = responseRecipients.data
    res.render('transaction', {
      title: "Operation",
      hasEmail,
      recipientList,
      venmoUser: users.venmoUser
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


routes.get('/recipientAdd', async (req, res) => {
  const usersId = app.locals.usersId;
  res.render('recipientAdd',{
    title: "Add Recepient",
    usersId
  });

});

routes.post('/saveRecipient', async (req, res) => {
  
  try {
    const response = await axios.post('http://localhost:8080/recipients', req.body.recipient);
    console.log(response.data);
    res.redirect('/');
  } catch (error) {
    console.error(error);
  }

});

routes.post('/transactionStep1', async (req, res) => {
  
  try {
    console.log('youre in step 2');
    console.log(req.body.operation);

    const response = await axios.post('http://localhost:8080/operations', req.body.operation);
    console.log(response.data);
    console.log("this is the "+response.data._id);
    res.render('transactionStep1',{
      operationId: response.data._id
    });
  } catch (error) {
    console.error(error);
  }

});

routes.post('/transactionFinished', async (req, res) => {
  
    console.log('youre in Transaction Details');
    const operationInfo = req.body.operations;
    console.log(operationInfo);
  try {
  
    const responseOperation = await axios.put(`http://localhost:8080/operations/${operationInfo._id}`, req.body.operations);
    const responseList = responseOperation.data;
    console.log(responseList);
    res.render('transactionFinished',{
      responseList
    });
  }
   catch (error) {
    console.error(error);
  }

});