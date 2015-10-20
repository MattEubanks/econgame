angular.module('main').controller('DocsController', DocsController);
DocsController.$inject = ['$http', '$scope'];

function DocsController($http, $scope) {
  var self = this;

  this.getDocs = function() {
	  var ws = new WebSocket('ws://localhost:8000');
	  ws.addEventListener('open', function() {
	    ws.send('you!');
	  })

	  ws.addEventListener('message', function(event) {
	    display();

	  })
	  function display (){
	  	var sum =0;
	  	var dataArray = [];
	  	var numArray = [];
	  	var ansArray = [];
	  	var results;
	    $http.get('/userguess').success(function(data, status, headers, config) {
	      dataArray = data;
	      for (var i = 0; i < dataArray.length; i++) {
	        numArray.push(dataArray[i].numGuess);
	      } 
	      for (var i = 0; i < numArray.length; i++) {
	        sum += numArray[i]
	      }
	      sum = Math.round((sum / data.length) / 2);
	      for (var i = 0; i < numArray.length; i++) {
	        ansArray.push(Math.abs(numArray[i] - sum));
	      }
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
