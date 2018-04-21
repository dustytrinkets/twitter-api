'use strict'


var express = require('express');
var UserController = require('../controller/user');
var md_auth = require('../middleware/authenticated')
var md_logs = require('../middleware/writeLog')
var api = express.Router()

var multiparty = require('connect-multiparty')
var md_upload = multiparty({uploadDir: './uploads/users'})

api.post('/user', UserController.createUser);
api.post('/user/insertImage/:id', [md_auth.ensureAuth, md_upload], UserController.insertImage); //el segundo parametro es un middleware
api.post('/user/login', UserController.login);
api.get('/user', md_auth.ensureAuth, UserController.getUsers);


module.exports = api;