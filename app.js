//Global Variables
var latMin = -40;
var latMax = 60;
var lonMin = -140;
var lonMax = 140;
var newsData;
var localNews;
var localNewsUrl;
var randomLocation = "";
var newsLocality = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?fq=glocations:'+'"'+randomLocation+'"'+'=20120101&api-key=85bb8c0adbf93a2930ec27229bc6eb2d:5:74093223';
var map;

//Main Function - Initializes map, provides local variables, defines random lat and lon. Contains country function.
function initMap() {
  var randomLat = Math.random() * (latMax - latMin) + latMin;
  var randomLon = Math.random() * (lonMax - lonMin) + lonMin;
  var myCenter = new google.maps.LatLng(randomLat,randomLon);
  var myCenterString = myCenter.toString();
  
  var mapProp = {
    center: myCenter,
    zoom: 3
  };

    map = new google.maps.Map(document.getElementById("map"),mapProp);

 	console.log(myCenterString);

//This function uses google maps geocoding services to pull country name information from their API to be used later.

 var country = function() {

  var geocoder = new google.maps.Geocoder();
  var latlng = myCenter;

  geocoder.geocode({"location" : latlng}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      if (results[1]) {
        map.setZoom(4);

  randomLocation = (results[(results.length-1)].formatted_address);
 
  var newsLocalityLocal = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?fq=glocations:'+'"'+randomLocation+'"'+'=20120101&api-key=85bb8c0adbf93a2930ec27229bc6eb2d:5:74093223';
 newsLocality = newsLocalityLocal;
  console.log(randomLocation);

//Request to NYTimes API for news data.

var xhr = new XMLHttpRequest();
xhr.open("GET", newsLocality , false);
xhr.send();
newsData = JSON.parse(xhr.responseText);

localNews = newsData.response.docs[0].snippet;
localNewsUrl = newsData.response.docs[0].web_url;
localNewsUrlLink = '"<a href='+localNewsUrl+'>'+localNewsUrl+'</a>"';
console.log(localNews);
console.log(localNewsUrl);
console.log(xhr.status);
console.log(xhr.statusText);
console.log(newsLocality);

var infowindow = new google.maps.InfoWindow({
    position:myCenter,
    borderRadius: 5,
    borderWidth: 2
  });
  infowindow.setContent(localNews + "<br>" + "<br>" + localNewsUrl + "<br>" + "<br>" + "Country:" + "  " + randomLocation);
  infowindow.open(map);

  return;
    } 
    else if (results.length < 1){
      console.log(status)
      initMap();
    }
 } else if (status !== google.maps.GeocoderStatus.OK) { 
  console.log(status);
  initMap();
  
  }


});
}

country();



 

}



google.maps.event.addDomListener(window, 'load', initMap);











