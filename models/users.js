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
                },
                isAdmin:{
                    type: Boolean,
                    required: true
                }

            });

module.exports = mongoose.model('User', userSchema, 'users');
