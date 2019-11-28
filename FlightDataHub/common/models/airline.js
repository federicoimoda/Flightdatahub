'use strict';
var app = require("../../server/server");
var querys = require('../../server/getQueryTools');

module.exports = function (Airline) {

    Airline.validatesUniquenessOf('IATA_CODE', { message: 'Aerolinea con IATA_CODE existe, no se puede agregar.' });

    Airline.observe('before delete', async function (ctx, next) {

        try {
            var airline = await app.models.Airline.find({ where: { _id: ctx.where.id } });

            var flights = await app.models.Flight.find({ where: { AIRLINE: airline[0].IATA_CODE } });
    
            if (flights.length > 0) {
                var err = new Error("No se pude borrar la aerolinea proque existen vuelos de la aerolinea");
                err.statusCode = 400;
                next(err);
            }  
        } catch (error) {
            log.errorLog("Error al validar eliminacion de Aerolinea",error.toString());
        }

    });

    querys.loadAirline_redis_db(app);

}