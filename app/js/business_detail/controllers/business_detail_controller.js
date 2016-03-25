module.exports = function(app) {
  app.controller('BusinessDetailController', ['$scope', '$http', '$routeParams',
    function($scope, $http, $routeParams) {
      $scope.businessid = $routeParams.businessid;

      $http.get('/api/businesses/' + $scope.businessid)
        .then(
          (data) => {
            $scope.business = data;
          },
          (err) => {
            console.log(err);
          })
  }]);
};
