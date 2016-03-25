module.exports = function(app) {
  app.controller('HomeController', ['$scope', '$http',
    function ($scope, $http) {

      $http.get('http://localhost:3000/api/businesses')
        .then(
          function(data) {
            $scope.businesses = data;
          },
          function(err) {
            console.log(err);
        })
  }]);
}
