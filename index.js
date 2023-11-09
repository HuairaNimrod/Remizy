const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const logger = require('morgan');
const dotenv = require('dotenv');
dotenv.config();
const path = require('path');
const { auth } = require('express-openid-connect');
const router = require('./routes/index');



const app = express();
const port = process.env.PORT ;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());




app.use(bodyParser.json());
app.use((req, res, next) =>{
        res.setHeader('Access-Control-Allow-Origin','*') // instructs browsers to permit that origin to access server resources for requests without credentials
        next();
    });


const config = {
      authRequired: false,
      auth0Logout: true
    }; 
  
app.use(auth(config));


    // Middleware to make the `user` object available for all views
app.use(function (req, res, next) {
      res.locals.user = req.oidc.user;
      next();
    });
    // .use('/', require('./routes')); //accessing routes folder

app.use('/', router);

const db = require('./models');
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`DB Connected and server running on ${port}.`);
    });
  })
  .catch((err) => {
    console.log('Cannot connect to the database!', err);
    process.exit();
  });