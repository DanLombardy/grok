//TODO: Make angular service to abstract away http requests

module.exports = function(app) {

	app.factory('googlePlacesApi', ['$window', function ($window) {
		if (!$window.google) throw 'Global `google` var missing. Did you forget to include the places API script?';

		return $window.google;
	}]);

	app.controller('HomeController', ['$scope', '$http', '$window','googlePlacesApi',
		function($scope, $http, $window, google) {

			// This example adds a search box to a map, using the Google Place Autocomplete
			// feature. People can enter geographical searches. The search box will return a
			// pick list containing a mix of places and predicted search terms.

			// This example requires the Places library. Include the libraries=places
			// parameter when you first load the API. For example:
			// <script src='https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places'>

			function initGoogleMaps(latitude, longitude, zoom){
				function initAutocomplete() {
					var map = new google.maps.Map(document.getElementById('map'), {
						center: {lat: latitude, lng: longitude},
						zoom: zoom,
						mapTypeId: google.maps.MapTypeId.ROADMAP
					});
				// Create the search box and link it to the UI element.
					var input = document.getElementById('pac-input');
					var searchBox = new google.maps.places.SearchBox(input);
					map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

				// Bias the SearchBox results towards current map's viewport.
					map.addListener('bounds_changed', function() {
						searchBox.setBounds(map.getBounds());
					});

					var markers = [];
				// Listen for the event fired when the user selects a prediction and retrieve
				// more details for that place.
					searchBox.addListener('places_changed', function() {
						var places = searchBox.getPlaces();
						if (places.length == 0) {
							return;
						}

						// Clear out the old markers.
						markers.forEach(function(marker) {
							marker.setMap(null);
						});
						markers = [];

					// For each place, get the icon, name and location.
						var bounds = new google.maps.LatLngBounds();
						places.forEach(function(place) {
							var icon = {
								url: place.icon,
								size: new google.maps.Size(71, 71),
								origin: new google.maps.Point(0, 0),
								anchor: new google.maps.Point(17, 34),
								scaledSize: new google.maps.Size(25, 25)
							};

						// Create a marker for each place.
							markers.push(new google.maps.Marker({
								map: map,
								icon: icon,
								title: place.name,
								position: place.geometry.location
							}));

							if (place.geometry.viewport) {
							// Only geocodes have viewport.
								bounds.union(place.geometry.viewport);
							} else {
								bounds.extend(place.geometry.location);
							}
						});
						map.fitBounds(bounds);
					});
				}
				initAutocomplete();
			}




			if ('geolocation' in navigator) {
				navigator.geolocation.getCurrentPosition(function(position) {
					initGoogleMaps(position.coords.latitude, position.coords.longitude, 13);
				});
			}
			// 	else {
			// 	initGoogleMaps(37.09024, -95.712891, 4)
			// }










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
