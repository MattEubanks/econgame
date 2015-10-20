angular.module('main').controller('NumController', NumController);
NumController.$inject = ['$http', '$state'];

function NumController($http, $state) {
  var self = this;
  this.newUser = {};

  this.addUser = function() {
    // posts guesses
    $http.post('/userguess', this.newUser).success(function(data, status, headers, config) {
      self.newUser = {
        username: '',
        numGuess: ''
      };
    });
    // takes you to results page upon submition
    $state.go('results');
  };
}