const config = require("../config");
var mongoose = require("mongoose");

exports.initDataBase = function () {
    try {
        mongoose.connect(config.mongo_url, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log('Coneccion Satifactoria a la Base de Datos.');
    } catch (error) {
        console.log('Error al conectar a la Base de Datos.');
    }
}