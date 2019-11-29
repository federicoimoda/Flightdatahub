const http = require('http');
const url = require('url');
const Error = require('../models/error.model');
const QueryTool = require('../models/queryTool.model');

const config = require("../config");


exports.server_create = async function () {
    http.createServer(function (req, res) {

        res.writeHead(200, { 'Content-Type': 'text/html' });
        var q = url.parse(req.url, true).query;
        var obj;

        if(q.type == "error"){

            obj = { ERROR: q.error, DESCRIPTION: q.desc }
            var error = new Error(obj);
            error.save();
            console.log("Nuevo Log de Error ingresado.");
        }else{
            obj = { USER: q.user, TASK: q.task, DESCRIPTION: q.desc }
            var queryTool = new QueryTool(obj);
            queryTool.save();
            console.log("Nuevo Log de QueryTool ingresado.");
        }
        
        res.end(JSON.stringify(obj));
        console.log("Esperando ingreso de Log...");

    }).listen(config.port);
};