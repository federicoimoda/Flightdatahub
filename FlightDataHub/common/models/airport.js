'use strict';

module.exports = function(Airport){

    Airport.validatesUniquenessOf('IATA_CODE', {message: 'Aeropuerto con IATA_CODE existe, no se puede agregar.'});

};