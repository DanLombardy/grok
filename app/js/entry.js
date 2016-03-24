const angular = require('angular');
require('angular-route');
const grokApp = angular.module('grokApp', ['ngRoute']);

require('./services')(grokApp);

require('./home')(grokApp);

grokApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '/views/home_view.html',
      controller: 'HomeController'
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
    .otherwise({
      redirectTo: '/'
    });
}]);
