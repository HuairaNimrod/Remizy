const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
                email:{
                    type: String,
                    required: true
                },
                venmoUser:{
                    type: String
                },
                nickname:{
                    type: String
                }

            });

module.exports = mongoose.model('User', userSchema, 'users');
