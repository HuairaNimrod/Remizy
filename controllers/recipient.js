const db = require('../models');
const Recipient = db.recipient;


exports.getAllById = (req, res) =>{

  let senderId = req.params.id;

  try{
    Recipient.find({usersId: senderId})
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


exports.createRecipient = async (req, res) => {
  try {
    const recipient = new Recipient({
      currency: req.body.currency,
      bank: req.body.bank,
      accountType: req.body.accountType,
      accountNumber: req.body.accountNumber,
      accountName: req.body.accountName,
      usersId: req.body.usersId
    }
  )
    const data = await recipient.save();
    res.send(data);
  } catch(e) {
    res.status(500).send({ message: e.message })
  }
  };


