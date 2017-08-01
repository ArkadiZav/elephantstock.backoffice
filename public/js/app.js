var app = angular.module('imageProcessingApp', ['ui.router', 'ngFileUpload']);

app.config(function($locationProvider, $stateProvider, $urlRouterProvider) {
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
  $urlRouterProvider.otherwise('/imageprocess');
  $stateProvider
    .state('imageprocess', {
      url: '/imageprocess',
      templateUrl: '/index.html',
      controller: 'moveImageController'
    })
});
