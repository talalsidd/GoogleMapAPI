
function initMap() {
 var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 24.9056, lng: 67.0822},
    zoom: 10
  });
  // var marker = new google.maps.Marker({
  //   position : {lat:24.8937,lng:67.2163},
    
  //   map:map
  // });
//   markerAdd({lat:24.8937,lng:67.2163});
// function markerAdd(coords){
//   var marker = new google.maps.Marker({
//     position : coords,
    
//     map:map
// });
// }
var address = document.getElementById('autoSearch');
var autoComp = new google.maps.places.Autocomplete(address);
var infowindow = new google.maps.InfoWindow();
  var marker = new google.maps.Marker({
    map: map,
    anchorPoint: new google.maps.Point(0, -29)
  });
  autoComp.addListener('place_changed', function() {
    infowindow.close();
    marker.setVisible(false);
    var place = autoComp.getPlace();
    if (!place.geometry) {
      window.alert("Not found " + place.name + "'");
      return;
    }
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(18); 
    }
    marker.setPosition(place.geometry.location);
    marker.setVisible(true);
  });

}