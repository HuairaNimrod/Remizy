const mongoose = require('mongoose');

const recipientSchema = new mongoose.Schema({
                currency:{
                    type: String,
                    required: true
                },
                bank:{
                    type: String
                },
                accountType:{
                    type: String
                },
                accountNumber:{
                    type: String
                },
                accountName:{
                    type: String
                },
                usersId:{
                    type: String,
                    required: true
                }

            });

module.exports = mongoose.model('Recipient', recipientSchema, 'recipients');
