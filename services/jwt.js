'use strict'

//creador de tokens

var jwt = require('jwt-simple'); //json web token
var moment = require('moment'); //para trabajar con fechas de js  mas amigables
var secret = 'clave_secreta_curso';

exports.createToken = function(user){
    var payload = {
        sub: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        image: user.image,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix(),
    };
    return jwt.encode(payload, secret)
};