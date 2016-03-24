var angular = require('angular');

module.exports = function(app) {
  app.controller('HomeController', ['$scope', '$http', /*'grokData',*/
    function ($scope, $http/*, grokData*/) {

      $scope.messageOne = 'You found scope.message!'


        $http.get('http://localhost:3000/api/businesses')
          .then(
            function(data) {
              $scope.data = {businesses: data};
            },
            function(e) {
              console.log(e);
          })


      // $scope.getData = function() {
      //   grokData.allBusinesses()
      //     .then(function(data) {
      //       $scope.message = data.length > 0 ? "Yay" : 'No businesses found';
      //       $scope.data = {business: data};
      //     })
      // };
  }]);
}
