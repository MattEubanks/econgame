(function() {
  angular.module('main', [
    'ui.router'
  ])

  .config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'pages/home.html',
        controller: "NumController",
        controllerAs: "numCtrl"
      })
      .state('results', {
        url: '/results',
        templateUrl: 'pages/results.html',
        controller: 'DocsController',
        controllerAs: 'docsCtrl'
      })
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode({
      enabled: true
    });
  });
})();


// window.addEventListener('load', function() {
//   var ws = new WebSocket('ws://localhost:8000');
//   ws.addEventListener('open', function() {
//     ws.send('players');
//     console.log("message sent");
//   })

//   ws.addEventListener('message', function(event) {
//     console.log(event.data);
//   })
// })