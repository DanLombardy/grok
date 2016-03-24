require('angular/angular');
require('angular-route');
var angular = window.angular;

var grokApp = angular.module('GrokApp', ['ngRoute']);

grokApp.config(['$routeProvider', function($route) {
  $route
    .when('/home', {
      templateUrl: '/views/home_view/html',
      controller: 'homeCtrl'
    })
    .when('/user', {
      templateUrl: '/views/user_profile_view.html'
    })
    .when('/addreview', {
      templateUrl: '/views/add_review_view.html'
    })
    // TO DO: BUSINESS DETAILS PAGE
    // .when('/business/:businessid', {
    //   templateUrl: '/views/business_detail_view.html',
    //   controller: '/businessDetailCtrl'
    // })
    .otherwise({redirectTo: '/'});
}]);
