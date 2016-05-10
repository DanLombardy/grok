const angular = require('angular');
require('angular-route');
const grokApp = angular.module('grokApp', ['ngRoute', 'google.places']);

require(__dirname + '/home')(grokApp);
require(__dirname + '/business_detail')(grokApp);
require(__dirname + '/d3_cloud')(grokApp);
require(__dirname + '/google_places')(grokApp);


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
