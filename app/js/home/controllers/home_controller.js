//TODO: Make angular service to abstract away http requests

module.exports = function(app) {
  app.controller('HomeController', ['$scope', '$http',
    function($scope, $http) {

      $http.get('/api/businesses')
        .then(
          (data) => {
            $scope.businesses = data;
          },
          (err) => {
            console.log(err);
          });
    }]);
};
