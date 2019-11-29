var http = require('http');

exports.errorLog = function (error,desc) {

    var url = 'http://localhost:8083?error='+error+'&desc='+desc+'&type=error';
    http.get(url, (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });
        resp.on('end', () => {
            console.log('Ingresado Log.');
        });
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
}

exports.queryToolLog = function (user,task,desc) {

    var url = 'http://localhost:8083?user='+user+'&task='+task+'&desc='+desc+'&type=queryTool';
    http.get(url, (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });
        resp.on('end', () => {
            console.log('Ingresado Log.');
        });
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
}