var http = require('http');
var config = require("../config");
var log = require('./log');

exports.toSubscribe = function () {

    try {

        http.get('http://localhost:8080?uri=localhost&port=3000', (resp) => {
            let data = '';
            resp.on('data', (chunk) => {
                data += chunk;
            });
            resp.on('end', () => {
                console.log('Subscripcion a FAAFAirportsAirlines');
            });
        }).on("error", (err) => {
            console.log("Error: " + err.message);
            log.errorLog("Error en Subscripcion a FAAFAirportsAirlines", err.toString());
        });

        var url2 = "http://localhost:8081?uri=localhost&port=3000&cant_post=" + config.cant_post + "&num_reg=" + config.num_reg + "&offset=" + config.offset;

        http.get(url2, (resp) => {
            let data = '';
            resp.on('data', (chunk) => {
                data += chunk;
            });
            resp.on('end', () => {
                console.log('Subscripcion a FAAFlights');
            });
        }).on("error", (err) => {
            console.log("Error: " + err.message);
            log.errorLog("Error en Subscripcion a FAAFlights", err.toString());
        });

        var url3 = "http://localhost:8082?uri=localhost&port=3000&cant_post=" + config.cant_post2 + "&num_reg=" + config.num_reg2 + "&offset=" + config.offset2;

        http.get(url3, (resp) => {
            let data = '';
            resp.on('data', (chunk) => {
                data += chunk;
            });
            resp.on('end', () => {
                console.log('Subscripcion a FAAFlights2');
            });
        }).on("error", (err) => {
            console.log("Error: " + err.message);
        });
    } catch (error) {
        log.errorLog("Error en Subscripcion a FAAFlights2", err.toString());
    }
}

