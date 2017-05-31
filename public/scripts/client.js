console.log("client sourced");

var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function($routeProvider, $locationProvider) {
  $routeProvider.when('/', {
    template: '',
    controller: 'LoginController as lc'
  }).when('/intentions', {
    templateUrl: 'views/intent.html',
    controller: 'IntentController as ic'
  }).when('/week', {
    templateUrl: 'views/viz.html',
    controller: 'WeekController as wc'
  }).when('/home', {
    templateUrl: 'views/home.html',
    controller: 'HomeController as hc'
  }).otherwise('/');

  $locationProvider.html5Mode(true);
});
