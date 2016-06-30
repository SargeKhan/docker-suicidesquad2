var socket = require('socket.io-client')('http://supervisor:3000');
console.log("starting application");
socket.on('connect', function () {
  socket.send('hi');
  console.log('Started running docker');

  socket.on('message', function (msg) {
    console.log("Got a msg");
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
  console.log('I DIEEEEE stopped by ' + signal);
  socket.emit('message', "DIE?")
  process.exit(128 + value);
}

Object.keys(signals).forEach(function (signal) {
  process.on(signal, function () {
    shutdown(signal, signals[signal]);
  });
});
