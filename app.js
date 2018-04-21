'use strict'

var express = require('express')
var bodyparser = require('body-parser')

var app = express()

// cargar rutas
var user_routes = require('./routes/user')
var tweet_routes = require('./routes/twitter')

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json())

// rutas base
app.use('/api', user_routes)
app.use('/api', tweet_routes)

//Usamos swagger para documentar la API
var swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');

//Definimos un end point para la documentacion de la API
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
 //para verlo http://localhost:3977/api-docs/
module.exports = app;
