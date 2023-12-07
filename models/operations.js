const mongoose = require('mongoose');

    const operationSchema = new mongoose.Schema({
                sender:{
                    type: String
                },
                usersId:{
                    type: String,
                    required: true
                },
                receiver:{
                    type: String
                },
                amount:{
                    type: Number
                },
                rate:{
                    type: Number
                },
                depositId:{
                    type: String
                },
                status:{
                    type: String
                },
                comments:{
                    type: String
                }
            },{ timestamps: false, versionKey:false });

 module.exports = mongoose.model('Operation', operationSchema, 'operations');