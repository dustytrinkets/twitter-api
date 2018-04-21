exports.writeLog = function (req, res, next){
    console.log("peticion recibida");
    next()
}