'use strict'

var Twitter = require('../models/Twitter');
var moment = require('moment');

var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');
var Type = require('type-of-is');
var fs = require('fs');
var path = require('path');



function createTweet(req, res) {
    var params = req.body
    console.log(params)
    var twitter = new Twitter();
    console.log(req.user.email)
    
    twitter.text = params.text;
    twitter.user = {
        name: req.user.name,
        surname: req.user.surname,
        email: req.user.email,
        protected: req.user.protected,
        friends_count: req.user.friends_count,
        image: req.user.image,
    };
    twitter.retweet_count = params.rt_count;
    twitter.favorite_count = params.fav_count;
    twitter.created_at = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');

    twitter.save(function(err,result){
        if(err){
            res.status(500).send({'message':err.message})
        }else{
            res.status(201).send(result)
        }
    });
}

function getTweets(req, res) {
    Twitter.find({}, function (err, result) {
        if (err) {
            res.status(500).send({ 'message': err.message })
        } else {
            res.status(200).send(result)
        }
    })
}

function getTweet(req, res) {
    var id = req.params.id;
    Twitter.findById(id, function (err, result) {
        if (err) {
            res.status(500).send({ 'message': err.message })
        } else {
            res.status(200).send(result)
        }
    })
}


function updateTweet(req,res){ //metodo put
    var id = req.params.id

    var tweetObj = req.body;

    Twitter.findByIdAndUpdate(id, tweetObj, function (err,result) {
        if (err) {
            res.status(500).send({ 'message': err.message })
        } else {
            res.status(200).send(result)
        }
    })    
}


function deleteTweet(req,res) {
    var id = req.params.id

    Twitter.deleteOne({"_id":id}, function (err,result) {
        if (err) {
            res.status(500).send({ 'message': err.message })
        } else {
            res.status(200).send(result)
        }
    })
}





module.exports = {
    createTweet, getTweets, getTweet, updateTweet, deleteTweet,
};