console.log("client sourced");

var myApp = angular.module('myApp', ['ngRoute']);
// var vm = this;

// myApp.controller('LoginController', [function(){
//   var vm = this;
//   console.log("LoginController running");
//
// }]);

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

myApp.controller('LoginController', [function(){
  var vm = this;
  console.log("LoginController running");

}]);


myApp.controller('IntentController', [function() {
  console.log('IntentController loaded');
}]);


myApp.controller('WeekController', [function() {
  console.log('WeekController loaded');
  var vm = this;
}]);

myApp.controller('HomeController', [function() {
  console.log('HomeController loaded');
  var vm = this;
}]);
