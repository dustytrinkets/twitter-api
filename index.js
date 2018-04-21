'use strict'

var mongoose = require('mongoose');
var app = require('./app.js')
var port = process.env.PORT || 3977;

mongoose.connect('mongodb://admin:admin@ds249079.mlab.com:49079/twitter', (err, res) => {
    if(err){
        throw err;
    }else{
        console.log("base de datos lanzada con exito");
        app.listen(port, function(){
            console.log("servidor del api rest corriendo.")
        })
    }
})

