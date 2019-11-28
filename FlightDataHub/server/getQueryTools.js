const http = require('http');
const url = require('url');
var redis = require('redis');
var log = require('./log');
var app = require("./server");
var config = require("../config");

exports.management_querys = async function () {
  http.createServer(function (req, res) {

    res.writeHead(200, { 'Content-Type': 'text/html' });

    
    var q = url.parse(req.url, true).query;
    var type = q.type;

    if (type == "query5" || type == "query6") {

      var client = redis.createClient(6379);

      const REDIS_USER_DATA_INDEX = 2;

      client.select(REDIS_USER_DATA_INDEX);

      client.on('connect', function () {

        var type = q.type;

        if (type == "query5") {

          client.get("airlines", function (err, reply) {

            res.end(JSON.stringify(JSON.parse(reply)));
            log.queryToolLog("system", "Consulta de Datos de Aerolineas por query5 (Redis)", "Consulta");
          });
        } else {
          if (type == "query6") {

            client.get("airports", function (err, reply) {
              res.end(JSON.stringify(JSON.parse(reply)));
              log.queryToolLog("system", "Consulta de Datos de Aeropuertos por query6 (Redis)", "Consulta");
            });
          }
        }
      }).on('error', function (error) {
        log.errorLog("Error al consultar Datos en Query5 y Query6", error.toString());
      });
    } else {


      if (type == "query1") {

        //TODO

      } else {

        if (type == "query2") {

          //var collection = db.collection('test');
          //collection.find(

          var from = q.from;
          var end = q.end;
          var AIRLINE = q.AIRLINE;
          var ORIGIN_AIRPORT = q.ORIGIN_AIRPORT;
          var param = q.param;

          var MongoClient = require('mongodb').MongoClient;
          var url_ = config.mongo_url;

          MongoClient.connect(url_, function (err, db) {
            if (err) throw err;

            var dbo = db.db("FlightData");
            var query = {
              //DATE: { $gte: new Date(from), $lt: new Date(end) },
              CANCELLATION_REASON: "",
              AIRLINE: AIRLINE,
              ORIGIN_AIRPORT: ORIGIN_AIRPORT,
              CANCELLED: "1"
            };

            //dbo.collection("Flight").find(query).select(param).toArray(function (err, doc) {

            dbo.collection("Flight").find(query).toArray(function (err, doc) {

              if (err) {
                console.error(err);
              } else {
                res.end(JSON.stringify(doc));
              }
              db.close();
            });

          });


          /*
          var result = app.models.Flight.find(
            {
              DATE: { $gte: new Date(from), $lt: new Date(end) },
              CANCELLATION_REASON: "",
              AIRLINE: AIRLINE,
              ORIGIN_AIRPORT: ORIGIN_AIRPORT,
              CANCELLED: 0
            }

          ).select(param)
            .toArray(function (err, doc) {
              console.log("date function called");
              if (err) {
                console.error(err);
              } else {
                console.log(doc);
                res.end(JSON.stringify(JSON.parse(doc)));
              }
            });

        } else {
          if (type == "query3") {

            var result = app.models.Flight.find(
              {
                DATE: { $gte: new Date("2017-04-11"), $lt: new Date("2017-04-13") },
                CANCELLATION_REASON: "",
                AIRLINE: "",
                ORIGIN_AIRPORT: "",
                CANCELLED: 0
              }

            ).select('uniqueId confirmation_link item_name timeout username').count()
              .toArray(function (err, doc) {
                console.log("date function called");
                if (err) {
                  console.error(err);
                } else {
                  res.end(JSON.stringify(JSON.parse(doc)));
                }
              });
              */
        } else {
          if (type == "query4") {

            var result = app.models.Flight.find(
              {
                DATE: { $gte: new Date("2017-04-11"), $lt: new Date("2017-04-13") },
                CANCELLATION_REASON: "",
                AIRLINE: "AA",
                ORIGIN_AIRPORT: "",
                CANCELLED: 1
              }
            ).select('uniqueId confirmation_link item_name timeout username').count()
              .toArray(function (err, doc) {
                console.log("date function called");
                if (err) {
                  console.error(err);
                } else {
                  console.log(doc);
                  res.end(JSON.stringify(JSON.parse(doc)));
                }
              });

            res.end(JSON.stringify(JSON.parse(result)));
          }
        }
      }
    }

  }).listen(8079);
};


exports.loadAirline_redis_db = async function (app) {

  while (true) {

    var client = redis.createClient(6379);

    const REDIS_USER_DATA_INDEX = 2;

    client.select(REDIS_USER_DATA_INDEX);

    client.on('connect', async function () {

      var airlines = await app.models.Airline.find({});
      client.set("airlines", JSON.stringify(airlines).toString());
    });

    await sleep(10000)
  }
}

exports.loadAirline_redis_db = async function (app) {

  while (true) {

    var client = redis.createClient(6379);

    const REDIS_USER_DATA_INDEX = 2;

    client.select(REDIS_USER_DATA_INDEX);

    client.on('connect', async function () {

      var airlines = await app.models.Airline.find({});
      client.set("airlines", JSON.stringify(airlines).toString());
    });

    await sleep(10000)
  }
}

exports.loadAirport_redis_db = async function (app) {

  while (true) {

    var client = redis.createClient(6379);

    const REDIS_USER_DATA_INDEX = 2;

    client.select(REDIS_USER_DATA_INDEX);

    client.on('connect', async function () {

      var airports = await app.models.Airport.find({});
      client.set("airports", JSON.stringify(airports).toString());
    });

    await sleep(10000)
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}