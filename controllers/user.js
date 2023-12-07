const db = require('../models');
const User = db.user;


exports.findById = (req, res) => {
  
  let userId = req.params.id;
  
  User.findById({ _id: userId })
      .then((data) => {
        if (!data) res.status(404).send({ message: 'No user found with id ' + userId });
        else res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: 'Error retrieving user with bookId ' + userId,
        });
      });
  
};

exports.findOne = (req, res) => {
  
  let userEmail = req.params.email;
  
  User.findOne({ email: userEmail })
      .then((data) => {
        if (!data) res.status(404).send({ message: 'No user found with email ' + userEmail });
        else res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: 'Error retrieving user with email ' + userEmail,
        });
      });
  
};

exports.updateUser = async (req, res) => {

  const userId = req.params.id;
  
    try {

      //validate inputs
      if (!req.body.email || !req.body.venmoUser || !req.body.nickname) {
        res.status(400).send({ message: 'Content can not be empty!' });
        return;
       }

      const updatedUser = await User.findOneAndUpdate({ _id: userId }, req.body, { new: true });
      if (!updatedUser) {
        return res.status(404).send({ message: 'No user found with id ' + userId });
      }
      res.status(200).json(updatedUser);
    } catch (e) {
      res.status(500).send({ message: 'Error updating user: ' + e.message });
    }
  
};


exports.createUser = async (req, res) => {
  try {
    const user = new User({
      email: req.body.email,
      venmoUser: req.body.venmoUser,
      nickname: req.body.nickname,
      isAdmin: req.body.isAdmin
    }
  )
    const data = await user.save();
    res.send(data);
  } catch(e) {
    res.status(500).send({ message: e.message })
  }
  };


