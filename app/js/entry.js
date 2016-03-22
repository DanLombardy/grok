require('angular/angular');
require('angular-route');
var angular = window.angular;

var grokApp = angular.module('GrokApp', ['ngRoute']);

grokApp.config(['$routeProvider', function($route) {
  $route
    .when('/user', {
      templateUrl: '/views/user_profile_view.html'
    })
    .when('/addreview', {
      templateUrl: '/views/add_review_view.html'
    })
    .otherwise({redirectTo: '/'});
}]);
