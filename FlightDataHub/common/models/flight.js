'use strict';
var app = require("../../server/server")
var log = require('../../server/log');

module.exports = function (Flight) {

    Flight.validatesUniquenessOf('FLIGHT_NUMBER', { message: 'Numero de vuelo existente, no se puede agregar.' });

    Flight.validatesLengthOf('YEAR', { max: 4, message: { max: 'El año debe tener cuatro numeros' } });
    Flight.validatesLengthOf('YEAR', { min: 4, message: { min: 'El año debe tener cuatro numeros' } });

    Flight.validatesLengthOf('DAY', 'MONTH', { min: 1, message: { min: 'El dia y mes deben tener  minimo un numero' } });
    Flight.validatesLengthOf('DAY', 'MONTH', { max: 2, message: { max: 'El dia y mes deben tener maximo dos numeros' } });

    Flight.validatesLengthOf('SCHEDULED_DEPARTURE', { min: 4, message: { min: 'El scheduled departure debe tener 4 digitos' } });
    Flight.validatesLengthOf('SCHEDULED_DEPARTURE', { max: 4, message: { max: 'El scheduled departure debe tener 4 digitos' } });

    Flight.validate('DAY', 'YEAR', 'MONTH', validateDate, { message: 'No se puede convertir a date. Formato erroneo' });

    Flight.validate('SCHEDULED_DEPARTURE', validateScheduledDeparture, { message: 'No se puede convertir a date-time. Formato erroneo' });

    Flight.observe('after save', async function (ctx, next) {

        try {

            var airport = await app.models.Airport.find({ where: { IATA_CODE: ctx.instance.ORIGIN_AIRPORT } });

            var airport2 = await app.models.Airport.find({ where: { IATA_CODE: ctx.instance.DESTINATION_AIRPORT } });

            var airline = await app.models.Airline.find({ where: { IATA_CODE: ctx.instance.AIRLINE } });

            if (airport.length == 0 || airport2.length == 0 || airline.length == 0) {

                var err = "";

                if (airport.length == 0) { err = "No se puede ingrsar vuelo. Aeropuerto origren no existe. " };
                if (airport2.length == 0) { err = err + "No se puede ingrsar vuelo. Aeropuerto destino no existe. " };
                if (airline.length == 0) { err = err + "No se puede ingrsar vuelo. Aerolinea no existe. " };

                var err = new Error(err)
                err.statusCode = 400;
                next(err);
            }

        } catch (error) {
            log.errorLog("Error al validar Vuelo", error.toString());
        }

    });

    function validateDate(err) {
        if (isNaN(this.MONTH) || isNaN(this.DAY) || isNaN(this.MONTH)) {
            err();
        }
        var strDate = this.YEAR + "-" + this.MONTH + "-" + this.DAY;
        this.DATE = new Date(strDate);
    }

    function validateScheduledDeparture(err) {
        var hourStr = this.SCHEDULED_DEPARTURE.substr(0, 2);
        var minStr = this.SCHEDULED_DEPARTURE.substr(2, 2);
        if (isNaN(hourStr) || isNaN(minStr)) { err(); }
        var create_date = new Date(this.YEAR + "-" + this.MONTH + "-" + this.DAY + "T" + hourStr + ":" + minStr + ":00Z");
        this.SCHEDULED_DEPARTURE_DATETIME = create_date;
    }


};