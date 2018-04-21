'use strict'


var express = require('express');
var TweetController = require('../controller/twitter');
var md_auth = require('../middleware/authenticated')
var md_logs = require('../middleware/writeLog')
var api = express.Router()

var multiparty = require('connect-multiparty')
var md_upload = multiparty({uploadDir: './uploads/users'})


api.get('/twitter', TweetController.getTweets);
api.get('/twitter/:id', TweetController.getTweet);
api.post('/twitter', md_auth.ensureAuth, TweetController.createTweet); //pasas en el body (es mas seguro)
api.put('/twitter/:id', md_auth.ensureAuth, TweetController.updateTweet); //pasas por parametro (en la url)
api.delete('/twitter/:id', md_auth.ensureAuth, TweetController.deleteTweet);


module.exports = api;