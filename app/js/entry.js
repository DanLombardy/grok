const angular = require('angular');
require('angular-route');
const grokApp = angular.module('grokApp', ['ngRoute', 'google.places']);

require('./home')(grokApp);
require('./business_detail')(grokApp);

//Dan's Code
require('./controllers/controllers')(grokApp);
require('./directives/directives')(grokApp);

grokApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '/views/home_view.html',
      controller: 'HomeController'
    })
    .when('/business/:businessid', {
      templateUrl: '/views/business_detail_view.html',
      controller: 'BusinessDetailController'

    })
    .when('/user', {
      templateUrl: '/views/user_profile_view.html'
    })
    .when('/addreview', {
      templateUrl: '/views/add_review_view.html'
    })
    .otherwise({
      redirectTo: '/'
    });
}]);
