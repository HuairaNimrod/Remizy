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


module.exports = {getOperations};