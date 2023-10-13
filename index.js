const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.use('/', require('./routes')) //accessing routes folder

app.listen(port, ()=>{
    console.log("Running test")
})