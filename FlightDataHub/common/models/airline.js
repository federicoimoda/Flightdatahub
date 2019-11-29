'use strict';

module.exports = function(Airline){

    Airline.validatesUniquenessOf('IATA_CODE', {message: 'Aerolinea con IATA_CODE existe, no se puede agregar.'});

};