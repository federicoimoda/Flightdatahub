'use strict';
var log = require('../../server/log');
var app = require("../../server/server");
var querys = require('../../server/getQueryTools');

module.exports = function(Airport){

    Airport.validatesUniquenessOf('IATA_CODE', {message: 'Aeropuerto con IATA_CODE existe, no se puede agregar.'});

    Airport.observe('before delete', async function (ctx, next) {

        try {
            var airport = await app.models.Airport.find({ where: { _id: ctx.where.id } });

            var flights = await app.models.Flight.find({ where: { ORIGIN_AIRPORT: airport[0].IATA_CODE } });
    
            if(flights.length == 0){
                flights = await app.models.Flight.find({ where: { DESTINATION_AIRPORT: airport[0].IATA_CODE } });
            }
            
            if (flights.length > 0) {
                var err = new Error("No se pude borrar el Aeropuerto proque existen vuelos que salen o llegan a este Aeropuerto");
                err.statusCode = 400;
                next(err);
            }
        } catch (error) {
            log.errorLog("Error al validar eliminacion de Aeropuerto",error.toString());
        }

       
    });

    querys.loadAirport_redis_db(app);

};

