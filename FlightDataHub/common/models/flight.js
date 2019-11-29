'use strict';

module.exports = function(Flight){

    Flight.validatesUniquenessOf('FLIGHT_NUMBER', {message: 'Numero de vuelo existente, no se puede agregar.'});

    function validateDelete(){
        if(http.verb == 'delete'){
            //Validar algo
        }
    }
};