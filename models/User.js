'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var UserSchema = Schema({
    name: String,
    surname: String,
    email: {
        type: String, 
        required:true
    },
    password: String,
    rol: String,
    image: String,
});

module.exports = mongoose.model('User', UserSchema)