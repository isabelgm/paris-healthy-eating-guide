var map;

// initalize map function and apply bindings
function initMap(){
  var paris = {lat:48.8554235, lng: 2.3427983};
  map = new google.maps.Map(document.getElementById('map'),{
    zoom: 13,
    center: paris
  });

  // apply knockout bindings
  ko.applyBindings(new viewModel());
}

// Model
var restaurants = [
    {name: 'Chez Simone', location: {lat:48.8603937, lng: 2.3430545}},
    {name: 'Cafe Coutume', location: {lat:48.851599, lng: 2.3162123}},
    {name: 'Café Pinson', location: {lat:48.863732, lng: 2.3631037}},
    {name: 'Sol Semilla', location: {lat:48.8730959, lng: 2.363135900000001}},
    {name: 'Juice Lab Marais', location: {lat:48.8563595, lng: 2.3637123}}
];

var markers = [];

//viewModel
var viewModel = function(){
  var self = this;
  self.restaurantList = ko.observableArray(restaurants);

  //Stores user input
  self.query = ko.observable('');

  // Go through all restaurants,  add a marker and add it to the markers array
  restaurants.forEach(function(restaurant){
    var position = restaurant.location;

    restaurant.marker = new google.maps.Marker({
      position: position,
      map: map,
      animation: google.maps.Animation.DROP
    });
    // Push the marker to array of markers
    markers.push(restaurant.marker);
  });

  // Filters through observableArray and shows results that match the query
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
