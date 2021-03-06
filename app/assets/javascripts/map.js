// Model
var restaurants = [
    {name: 'Chez Simone', location: {lat:48.8603937, lng: 2.3430545}, about: '', id:'1550233375271520'},
    {name: 'Coutume Café', location: {lat:48.851599, lng: 2.3162123}, about: '', id:'187873637913065'},
    {name: 'Café Pinson', location: {lat:48.863732, lng: 2.3631037}, about: '', id:'138933902926897'},
    {name: 'Sol Semilla', location: {lat:48.8730959, lng: 2.363135900000001}, about: '', id:'339610619423805'},
    {name: 'Juice Lab Marais', location: {lat:48.8563595, lng: 2.3637123}, about: '', id:'330401513786136'}
];

var markers = [];
var map;

// Initalize map function and apply bindings
function initMap(){
  var paris = {lat:48.8554235, lng: 2.3427983};
  map = new google.maps.Map(document.getElementById('map'),{
    zoom: 13,
    center: paris,
    styles: [
      {
        featureType: 'water',
        elementType: 'geometry.fill',
        stylers: [{color: '#92B5D9'}]
      },
      {
        featureType: 'poi.business',
        stylers: [{visibility: 'off'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'labels',
        stylers: [{visibility: 'off'}]
      }
    ]
  });

  // apply knockout bindings
  ko.applyBindings(new viewModel());
}

//viewModel
var viewModel = function(){
  var self = this;
  self.restaurantList = ko.observableArray(restaurants);

  // Store user input
  self.query = ko.observable('');

  // Go through all restaurants and get facebook info,
  // then create a marker for each one.
  restaurants.forEach(function(restaurant){
    getFacebookInfo(restaurant);
  }); // end forEach loop

  // Create a marker on the map for a location
  function createMarker(restaurant){
    var position = restaurant.location;
    var infowindow = new google.maps.InfoWindow({
      maxWidth: 200
    });

    restaurant.marker = new google.maps.Marker({
      position: position,
      map: map,
      icon: "/default-marker.png",
      name: restaurant.name,
      id: restaurant.id,
      about: restaurant.about,
      animation: google.maps.Animation.DROP
    });

    // Push the marker to array of markers
    markers.push(restaurant.marker);

    // Call populateInfoWindow function
    populateInfoWindow(restaurant.marker, infowindow);

    // Add infowindow as a property to restaurant
    // this makes it available for use outside this function.
    restaurant.infowindow = infowindow;

    // Open infowindow when marker is clicked and change pin color
    restaurant.marker.addListener('click', function(){
      restaurant.marker.setIcon("/clicked-marker.png");
      infowindow.open(map, this);
    });
  }

  // Populate info window
  function populateInfoWindow(marker, infowindow){
    if (infowindow.marker != marker) {
      infowindow.marker = marker;
      infowindow.setContent('<div class="infowindow">' +
      '<p class="marker-name">'+ marker.name + '</p>'
      + '<p class="marker-description">'+  marker.about + '</p>'
      + '<p class="small">' + "info provided by restaurants Facebook" + '</p>'
      +'</div>');
    }
  }

  // Open the restaurant marker when list item is clicked
  openRestaurantMarkerFromList =  function(restaurant){
    restaurant.infowindow.open(map, restaurant.marker);
  }

  // Get data from Facebook Graph API and create a marker
  function getFacebookInfo(restaurant){
    $.ajax({
      url : '/restaurants/' + restaurant.id,
      type : 'GET',
      dataType:'json',
      success : function(data) {
          restaurant.about = data.about;
          createMarker(restaurant);
      },
      error : function(request, error) {
        console.log(error);
        alert("We're having some trouble getting a restaurant's info from Facebook. " +
        "Please check your internet connection and try refreshing the page.")
      }
    });
  }

  // Filter through observableArray and show results that match the query
  self.search = ko.computed(function(){
    var query = this.query().toLowerCase();
    if(!query) {
      // go through markers array and set markers to visible
      markers.forEach(function(marker){
        marker.setVisible(true);
      });
      // display list of all restaurants
      return self.restaurantList();
    } else {
      // display filtered results
      var restaurantList = self.restaurantList();
      return restaurantList.filter(function(restaurant) {
        var restaurantName = restaurant.name;
        var filterResult =  (restaurantName.toLowerCase().indexOf(query) > -1);
        restaurant.marker.setVisible(filterResult);
        return filterResult;
      });
      // hide markers that didn't appear on results using setVisible(false)
    }
  }, self);

}; // viewModel ends

//call initMap function
initMap();
