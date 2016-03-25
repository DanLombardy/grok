// This service is not currently being used.
module.exports = exports = function(app) {
  app.factory('grokData', ['$http', function grokData($http) {

    var Resource = function(resourceName) {
      this.resourceName = resourceName;
    }

    var allBusinesses = function () {
      return $http.get('http://localhost:3000/api/businesses');
    };

    var businessById = function(businessid) {
      return $http.get('/api/businesses/' + businessid);
    }

     var addReviewById = function (businessid, data) {
      return $http.post('/api/businesses/' + businessid + '/reviews', data);
    };

    return {
      allBusinesses : allBusinesses,
      businessById: businessById,
      addReviewById: addReviewById
    };

  }]);
}
