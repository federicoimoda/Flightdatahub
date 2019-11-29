var loopback = require('loopback');
var boot = require('loopback-boot');
var tosubs = require('./toSubscribe');
var log = require('./log');

var app = module.exports = loopback();

//log.errorLog("Error de Prueba","Simplemente un error de prueba");
//log.queryToolLog("system","Inicio FlightDataHub","Error de prueba");

tosubs.toSubscribe();

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

boot(app, __dirname, function(err) {
  if (err) throw err;

  if (require.main === module)
    app.start();
});
