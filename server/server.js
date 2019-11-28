var loopback = require('loopback');
var boot = require('loopback-boot');

var http = require('http');
var app = module.exports = loopback();

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

http.get('http://localhost:8081?uri=localhost&port=3000&num_reg=50&offset=10', (resp) => {
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
