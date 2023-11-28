const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
                email:{
                    type: String,
                    required: true
                },
                venmoUser:{
                    type: String,
                    required: true
                },
                nickname:{
                    type: String,
                    required: true
                }

            });

module.exports = mongoose.model('User', userSchema, 'users');
