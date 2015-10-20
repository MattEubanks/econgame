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
