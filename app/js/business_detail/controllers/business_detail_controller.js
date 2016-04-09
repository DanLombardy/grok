module.exports = function(app) {
  app.controller('BusinessDetailController', ['$scope', '$http', '$routeParams',
    function($scope, $http, $routeParams) {
      $scope.businessid = $routeParams.businessid;

      $http.get('/api/businesses/' + $scope.businessid)
        .then(
          (res) => {
            let reviews = res.data[0].reviews;
            let review;

            $scope.business = res.data[0];

            for (review in reviews) {
              $scope.words = review.time;
            }
          },
          (err) => {
            console.log(err);
          });
    }]);
};
