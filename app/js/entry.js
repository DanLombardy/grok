require('angular/angular');
require('angular-route');
var angular = window.angular;

var grokApp = angular.module('GrokApp', ['ngRoute']);

grokApp.config(['$routeProvider', function($route) {
  $route
    .when('/', {
      temmplateUrl: '/views/user_profile_view.html'
    })
    // .when('/user/:username', {
    //   templateUrl: 'user_profile_view.html'
    //   controller: 'UserController'
    // })
    .otherwise({redirectTo: '/'});
}])
