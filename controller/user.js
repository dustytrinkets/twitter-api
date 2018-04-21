'use strict'


var User = require('../models/User');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt'); //creador de tokens
var Type = require('type-of-is');
var fs = require('fs');
var path = require('path');


function createUser (req,res){
    
    var user = new User();

    user.name = req.body.name;
    user.surname = req.body.surname;
    user.email = req.body.email;
    user.rol = req.body.rol;

    bcrypt.hash(req.body.password, null, null, function(err,hash){
        console.log(hash) //la contraseña encriptada
        user.password = hash;     
        user.save(function (err, result) {
            if (err) {
                res.status(500).send({ 'message': err.message })
            } else {
                res.status(200).send(result)
            }
        })   
    })
}


function getUsers(req, res) {
    User.find({}, function (err, result) {
        if (err) {
            res.status(500).send({ 'message': err.message })
        } else {
            res.status(200).send({ result })
        }
    })
}

function login(req,res){ //registro por nombre o email
    var login = req.body.login;
    var password = req.body.password;

    User.findOne({$or: [{email:login},{name:login}] }, function(err,result){
        if (err) {
            res.status(500).send({ 'message': err.message })
        } else {
            if(result){
                bcrypt.compare(password, result.password, function(err,ok){
                    if(ok){
                        res.status(200).send(jwt.createToken(result))  //crea el token                  
                    }else{
                        res.status(400).send({ 'message': 'wrong password' })                    
                    }
                })
            }else{
                res.status(400).send({ 'message': 'user does not exist' })                                    
            }
        }
    })
}

function insertImage(req,res){
    var imagePath = req.files.image.path;
    var userId = req.params.id;
    console.log(imagePath)

    User.findOneAndUpdate({_id: userId}, {image:imagePath}, function(err,result){
        res.status(200).send({'message':'upload correct'})
    })

}


module.exports = {
    createUser, getUsers, login, insertImage
};