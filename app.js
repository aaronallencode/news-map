//Global Variables
var latMin = -40;
var latMax = 60;
var lonMin = -140;
var lonMax = 140;
var newsData;
var localNews;
var localNewsUrl;
var localNewsUrlLink;
var randomLocation = "";
var map;
var region;


var northern = function() {
latMin = 0;
latMax = 60;
};
var southern = function() {
  latMin = -40;
  latMax = 0;
};

//Main Function - Initializes map, provides local variables. Contains country function.

var initMap = function() {
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

 var country = function() {
  var geocoder = new google.maps.Geocoder();
  var latlng = myCenter;

  geocoder.geocode({"location" : latlng}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      if (results[1]) {
        map.setZoom(4);

  randomLocation = (results[(results.length-1)].formatted_address);
 
  var newsLocalityLocal = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?fq=glocations:'+'"'+randomLocation+'"'+'=20120101&api-key=85bb8c0adbf93a2930ec27229bc6eb2d:5:74093223';

  console.log(randomLocation);

var xhr = new XMLHttpRequest();
xhr.open("GET", newsLocalityLocal , false);
xhr.send();
newsData = JSON.parse(xhr.responseText);
newsDataDocuments = newsData.response.docs;

var getRandomInt = function() {
  return Math.floor(Math.random() * 9);
}
var randomArticleInt;
randomArticleInt = getRandomInt();

console.log(randomArticleInt);
console.log(newsDataDocuments);

localNews = newsDataDocuments[randomArticleInt].snippet;

localNewsUrl = newsDataDocuments[randomArticleInt].web_url;

var localNewsImgUrl = "";
var imgUrl = "";
var localNewsImgLink = "";

if (newsDataDocuments[randomArticleInt].multimedia[0]){
localNewsImgUrl = newsDataDocuments[randomArticleInt].multimedia[0].url;
imgUrl = 'http://www.nytimes.com/'+ localNewsImgUrl;
localNewsImgLink = '"<img src='+imgUrl+'>"';
}

else {
  localNewsImgLink = "Sorry! (No picture data for this article)";
}


var localNewsUrlLink = '"<a href='+localNewsUrl+'>'+localNewsUrl+'</a>"';

console.log(localNewsImgLink);
console.log(localNews);
console.log(localNewsUrl);
console.log(xhr.status);
console.log(xhr.statusText);
console.log(newsLocalityLocal);

        if(localNews === "") {
          console.log(status);
          initMap();
        }

var infowindow = new google.maps.InfoWindow({
    position:myCenter,
  });

  infowindow.setContent(localNews + "<br>" + "<br>" + localNewsUrlLink + "<br>" + "<br>" + localNewsImgLink + "<br>" + "<br>" + "Country:" + "  " + randomLocation);
  infowindow.open(map);
  
    } 
    else { 
  console.log(status);
  setTimeout(initMap,500);
  }
 } 
  else { 
  console.log(status);
  setTimeout(initMap,500);
  }
});
}

country();

}


google.maps.event.addDomListener(window, 'load', initMap);











