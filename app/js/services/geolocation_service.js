module.exports = exports = function(app) {
  app.factory('geolocation', function(cbSuccess, cbError, cbNoGeo) {

    var getPosition = function(cbSuccess, cbError, cbNoGeo) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(cbSuccess, cbError);
      }
      else {
        cbNoGeo();
      }
    };
    return {
      getPosition: getPosition
    };

  });
}
