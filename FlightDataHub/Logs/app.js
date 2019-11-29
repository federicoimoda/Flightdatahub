const server = require('./controllers/serverController');
const db = require('./controllers/dbController');


var app = async function (){

    db.initDataBase();
    console.log("Esperando ingreso de Log...");
    server.server_create();

}

app();