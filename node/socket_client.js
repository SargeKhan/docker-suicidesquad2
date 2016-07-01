var http = require('http');

var server = http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(3000, '0.0.0.0');

var socket = require('socket.io-client')('http://supervisor:8000');
console.log("starting application");
socket.on('connect', function () {
  socket.on('message', function (msg) {
    console.log("Message received:", msg);
    if(msg == "DIE"){
      process.exit(128);
    }
  });
});

var signals = {
  'SIGINT': 2,
  'SIGTERM': 15
};

function shutdown(signal, value) {
  socket.emit('message', "DIE?")
  process.exit(128 + value);
}

Object.keys(signals).forEach(function (signal) {
  process.on(signal, function () {
    shutdown(signal, signals[signal]);
  });
});
