var WebSocket = require("faye-websocket");
var http = require("http");
var server = http.createServer();
var array = [];
var count = 1;
server.on('upgrade', function(request, socket, body) {
  if (WebSocket.isWebSocket(request)) {
    var ws = new WebSocket(request, socket, body);
    array.push(ws);
    count++;

    ws.on('message', function(event) {

      server.broadcast();
      console.log(count);
    });

    ws.on('close', function(event) {
      console.log('close', event.code, event.reason);
        var ind = array.indexOf(ws);
        array.splice(ind,1);
            ws = null;
    });
    // ws.send('you get this');
  }
});
server.broadcast = function(){
  for(var i=0; i<array.length; i++){
    array[i].send("new playas");
  }
}

server.listen(8000);
