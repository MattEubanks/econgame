var WebSocket = require("faye-websocket");
var http = require("http");
var server = http.createServer();
var array = [];
// upgrade is anytime a new sockets created
server.on('upgrade', function(request, socket, body) {
  if (WebSocket.isWebSocket(request)) {
    var ws = new WebSocket(request, socket, body);
    array.push(ws);
    // upon recieveing message calls broadcast function
    ws.on('message', function(event) {
      server.broadcast();
    });
    // removes the socket from the array if they close the window
    ws.on('close', function(event) {
        var ind = array.indexOf(ws);
        array.splice(ind,1);
            ws = null;
    });
  }
});
// function that sends a message to all the sockets in the array
server.broadcast = function(){
  for(var i=0; i<array.length; i++){
    array[i].send("player added");
  }
}

server.listen(8000);
