(function() {
  angular.module('main', [
    'ui.router'
  ])
// sets up our controllers
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
      // enables us to remove the # in the url
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode({
      enabled: true
    });
  });
})();
