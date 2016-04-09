module.exports = function(app){

  app.controller('CloudDataController', function($scope, $http){
    $scope.postSingle = function(metric){
      console.log('hit sucka');
      console.log(metric);

      $http.post('/cloudData', metric).then(function(response){
        console.log("this is response data");
        console.log(response.data);
        var data = response.data;
        $scope.$broadcast("cloudData", data);
      }, function(err){
        throw err;
      });
    };
  });
};
