var io = require('socket.io')(8000);
console.log("Starting server docker");

io.on('connection', function (socket) {
  socket.on('message', function (message) {
    if(message == 'DIE?')
      io.emit('message', 'DIE');
    console.log('received message' + message);
  });
//  socket.on('disconnect', function () {console.log("disconnected"); });
});
var signals = {
  'SIGINT': 2,
  'SIGTERM': 15
};
function shutdown(signal, value) {
  console.log('server stopped by ' + signal);
  process.exit(128 + value);
}
Object.keys(signals).forEach(function (signal) {
  process.on(signal, function () {
    shutdown(signal, signals[signal]);
  });
});
