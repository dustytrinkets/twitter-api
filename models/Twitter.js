'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var TweetSchema = Schema({
    text: String,
    user: {
        name: String,
        surname: String,
        email: String,
        protected: Boolean,
        friends_count: Number,
        image: String,
    },
    created_at: String,
    retweet_count: Number,
    favorite_count: Number,
});

module.exports = mongoose.model('Twitter', TweetSchema, 'twitter') //el tercer parametro es el nombre de la coleccion

