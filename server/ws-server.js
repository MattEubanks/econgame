var WebSocket = require("faye-websocket");
var http = require("http");
var server = http.createServer();
var array = [];
server.on('upgrade', function(request, socket, body) {
  if (WebSocket.isWebSocket(request)) {
    var ws = new WebSocket(request, socket, body);
    array.push(ws);
    ws.on('message', function(event) {
      server.broadcast();
    });

    ws.on('close', function(event) {
        var ind = array.indexOf(ws);
        array.splice(ind,1);
            ws = null;
    });
  }
});
server.broadcast = function(){
  for(var i=0; i<array.length; i++){
    array[i].send("new playas");
  }
}

server.listen(8000);
