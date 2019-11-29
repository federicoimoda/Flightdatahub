var http = require('http');

exports.toSubscribe = function () {

    http.get('http://localhost:8080?uri=localhost&port=3000', (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });
        resp.on('end', () => {
            console.log('Subscribed to FAAFAirportsAirlines');
        });
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });

    http.get('http://localhost:8081?uri=localhost&port=3000&cant_post=2&num_reg=5&offset=1', (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });
        resp.on('end', () => {
            console.log('Subscribed to FAAFlights');
        });
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });

    http.get('http://localhost:8082?uri=localhost&port=3000&cant_post=2&num_reg=5&offset=1', (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });
        resp.on('end', () => {
            console.log('Subscribed to FAAFlights');
        });
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });

}

