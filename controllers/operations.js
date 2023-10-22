// const mongodb = require('../db/connect');
// const ObjectId = require('mongodb').ObjectId;

const { response } = require('express');
const db = require('../models');
const Operations = db.operation;


const getOperations = (req, res) =>{

  try{
      Operations.find({})
      .then((data) => {
          res.send(data);
      })
      .catch((err) => {
          res.status(500).send({
          message: err.message || 'Some error occurred while retrieving operations.'
      });
      });
  } catch(err){
    res.status(500).json(err);
  }
};

const createOperation = (req, res) => {
    try{
      // Validate request
     if (!req.body.sender || !req.body.receiver) {
      res.status(400).send({ message: 'Content can not be empty!' });
      return;
     }
    const operation = new Operations(req.body);
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
    }catch (err) {
      res.status(500).json(err);
    }
  };


  // const updateOperation = async (req, res) => {
  //   try{
  //     const sender = req.body.sender;
  //     const receiver = req.body.receiver;
  //     const amount = req.body.amount;
  //     const rate = req.body.rate;
  //     const depositId = req.body.depositId;
  //     const status = req.body.status;
  //     const comments = req.body.comments;

  //   }
  //   catch (err){
  //     res.status(500).json(err);
  //   }
  // };


const deleteOperation = async (req, res) => {
    try {
      const id = await Operations.findByIdAndDelete(req.params.id);
      
      if(!id) res.status(404).send("No item found");
      res.status(200).send();

    } catch (err) {
      console.log(err);
      res.status(500).json(err || 'Some error occurred while deleting the contact.');
    }
  };

module.exports = {getOperations, createOperation, deleteOperation};




