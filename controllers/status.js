const db = require('../models');
const TxStatus = db.status;


const getTxstatus = (req, res) =>{

  try{
    TxStatus.find({})
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

const createTxstatus = (req, res) => {
    try{
      // Validate request
     if (!req.body.name) {
      res.status(400).send({ message: 'Content can not be empty!' });
      return;
     }
    const txstatus = new TxStatus(req.body);
    txstatus
      .save()
      .then((data) => {
        console.log(data);
        res.status(201).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while creating the status.'
        });
      });
    }catch (err) {
      res.status(500).json(err);
    }
  };



const deleteTxstatus = async (req, res) => {
    try {
      const id = await TxStatus.findByIdAndDelete(req.params.id);
      
      if(!id) res.status(404).send("No item found");
      res.status(200).send();

    } catch (err) {
      console.log(err);
      res.status(500).json(err || 'Some error occurred while deleting the contact.');
    }
  };

module.exports = {getTxstatus, createTxstatus, deleteTxstatus};




