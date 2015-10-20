angular.module('main').controller('DocsController', DocsController);
DocsController.$inject = ['$http', '$scope'];

function DocsController($http, $scope) {
  var self = this;

  this.getDocs = function() {
  	// creates new socket then sends a message to websocket server
	  var ws = new WebSocket('ws://localhost:8000');
	  ws.addEventListener('open', function() {
	    ws.send('you!');
	  })
	  // upon recieving a message from websocket server calls display function
	  ws.addEventListener('message', function(event) {
	    display();

	  })
	  function display (){
	  	var sum =0;
	  	var dataArray = [];
	  	var numArray = [];
	  	var ansArray = [];
	  	var results;
	  	// gets all the guesses in database
	    $http.get('/userguess').success(function(data, status, headers, config) {
	      dataArray = data;
	      // pushes all the numbers guessed in array
	      for (var i = 0; i < dataArray.length; i++) {
	        numArray.push(dataArray[i].numGuess);
	      } 
	      // adds all the numbers
	      for (var i = 0; i < numArray.length; i++) {
	        sum += numArray[i]
	      }
	      // averages and divides in half
	      sum = Math.round((sum / data.length) / 2);
	      // subtracts the average halved from each guess
	      for (var i = 0; i < numArray.length; i++) {
	        ansArray.push(Math.abs(numArray[i] - sum));
	      }
	      // finds the lowest values index and finds the winner
	      var answer = ansArray.indexOf(Math.min.apply(Math, ansArray));
	      for (var i = 0; i < dataArray.length; i++) {
	        if (i === answer) {
	          var winObj = dataArray[i],
	            winnerName = (winObj.username),
	            winnerGuess = (winObj.numGuess),
	            players = dataArray.length;
	        }
	      }
	      $scope.players = players;
	      $scope.sum = sum;
	      $scope.winnerName = winnerName;
	      $scope.winnerGuess = winnerGuess;
	    })
	  }  
  }
}
