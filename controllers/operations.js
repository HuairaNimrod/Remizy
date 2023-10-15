// const mongodb = require('../db/connect');
// const ObjectId = require('mongodb').ObjectId;

const db = require('../models');
const Operations = db.operations;

const getOperations = (req, res) =>{
    Operations.find({})
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
            message: err.message || 'Some error occurred while retrieving operations.'
         });
        });
};

const createOperation = (req, res) => {
    // Validate request
    // if (!req.body.username || !req.body.password) {
    //   res.status(400).send({ message: 'Content can not be empty!' });
    //   return;
    // }
  
    const operation = new Operations(req.body);
    // const operation = {
    //   Sender: req.body.Sender, 
    //   Receiver: req.body.Receiver, 
    //   Amount: req.body.Amount, 
    //   Rate: req.body.Rate,
    //   DepositId: req.body.DepositId,
    //   Status: req.body.Status,
    //   Comments: req.body.Comments
    // };
    operation
      .save()
      .then((data) => {
        console.log(data);
        res.status(201).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while creating the user.'
        });
      });
  };


module.exports = {getOperations, createOperation};