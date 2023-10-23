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
     if (!req.body.sender || !req.body.receiver || !req.body.amount || !req.body.rate|| !req.body.depositId|| !req.body.status|| !req.body.comments) {
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


  const updateOperation = async (req, res) => {
    // const operation = new Operations(req.body);

    try {
      await Operations.findByIdAndUpdate(req.params.id, !req.body.sender || !req.body.receiver || !req.body.amount || !req.body.rate|| !req.body.depositId|| !req.body.status|| !req.body.comments);
      res.status(200).send('Operation update');
    } catch (error) {
      res.status(500).send(error);
    }
  };


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

module.exports = {getOperations, createOperation, updateOperation, deleteOperation};




