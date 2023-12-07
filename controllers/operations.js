const db = require('../models');
const Operations = db.operation;


exports.getAll = (req, res) =>{
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

exports.getOperations = (req, res) =>{

  let userId = req.params.userId;

  try{
      Operations.find({usersId: userId})
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

exports.getOperationsById = (req, res) =>{

  let id = req.params.id;

  try{
      Operations.findById({_id: id})
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



exports.createOperation = (req, res) => {
    try{
      // Validate request
     if (!req.body.sender || !req.body.usersId || !req.body.receiver || !req.body.amount || !req.body.rate| !req.body.status) {
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
          message: err.message || 'Some error occurred while creating the Operation.'
        });
      });
    }catch (err) {
      res.status(500).json(err);
    }
  };


  exports.updateOperation = async (req, res) => {

    const operationId = req.params.id;
    try {
      //validate inputs
      if ( !req.body.depositId|| !req.body.status) {
        res.status(400).send({ message: 'Content can not be empty!' });
        return;
       }
        //new:true is to retrieve the document updated in response
      const updateOperation = await Operations.findOneAndUpdate({_id: operationId}, req.body, { new: true });
      res.status(201).json(updateOperation);
    } catch (error) {
      res.status(500).send(error);
    }
  };


  exports.deleteOperation = async (req, res) => {
    try {
      const id = await Operations.findByIdAndDelete(req.params.id);
      
      if(!id) res.status(404).send("No item found");
      res.status(200).send();

    } catch (err) {
      console.log(err);
      res.status(500).json(err || 'Some error occurred while deleting the contact.');
    }
  };


