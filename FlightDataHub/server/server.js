var loopback = require('loopback');
var boot = require('loopback-boot');
var tosubs = require('./toSubscribe');
var log = require('./log');
var querys = require('./getQueryTools');

var app = module.exports = loopback();

tosubs.toSubscribe();
querys.management_querys();

app.start = function () {
  // start the web server
  return app.listen(function () {
    try {
      app.emit('started');
      var baseUrl = app.get('url').replace(/\/$/, '');
      console.log('Web server listening at: %s', baseUrl);
      if (app.get('loopback-component-explorer')) {
        var explorerPath = app.get('loopback-component-explorer').mountPath;
        console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
      }
    } catch (error) {
        log.errorLog("Error inicializando server", error.toString());
    }
   
  });
};

boot(app, __dirname, function (err) {
  try {
    if (err) throw err;

    if (require.main === module)
      app.start();
  } catch (error) {
    log.errorLog("Error al inicializar loopback", error.toString());
  }

});


