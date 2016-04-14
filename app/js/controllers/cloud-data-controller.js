module.exports = function(app){

  app.controller('CloudDataController', function($scope, $http){
		let data;
		console.log(data);

		if($scope.address){
			data = {address: $scope.address};
			$http.post('/api/businesses/address', data).then(function(response){
	      console.log("this is response data");
	      console.log(response.data);
	      var data = response.data;
	      $scope.$broadcast("cloudData", data);
	    }, function(err){
	      throw err;
	    });
		}
  });
};
