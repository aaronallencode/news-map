// Variables
var latMin = -40;
var latMax = 60;
var lonMin = -140;
var lonMax = 140;
var myCenter;
var newsData;
var newsDataDocs;
var randomLocation = "";
var map;
var region;
var newsLocalityLocal;
var localNewsImgUrl = "";
var imgUrl = "";
var article;
var articleImg = "";
var articleUrl = "";
var articleLink = "";
var article = "";
var snippets;

//Individual Functions
//defines random article/img to grab and then sets window
var info = function(){
  grabArticle(randomArticleInt);
  grabImg(randomArticleInt);
  setInfoWindow();
}
//defines specific article/img to grab and then sets window
var info_x = function(x) { 
  grabArticle(x);
  grabImg(x);
  setInfoWindow();
}
//sets lat/lon
var northern = function() {
latMin = 0;
latMax = 60;
};
//sets lat/lon
var southern = function() {
  latMin = -40;
  latMax = 0;
};

var getRandomInt = function() {
  return Math.floor(Math.random() * 9);
};
var randomArticleInt = getRandomInt();


//Initializes map
var initMap = function() {
  var randomLat = Math.random() * (latMax - latMin) + latMin;
  var randomLon = Math.random() * (lonMax - lonMin) + lonMin;
  myCenter = new google.maps.LatLng(randomLat,randomLon);
  var myCenterString = myCenter.toString();
  var mapProp = {
    center: myCenter,
    zoom: 3
  };

  map = new google.maps.Map(document.getElementById("map"),mapProp);
  
  console.log(myCenterString);
}

// gets country
var getCountry = function() {
    var geocoder = new google.maps.Geocoder();
    var latlng = myCenter;
    geocoder.geocode({"location" : latlng}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        if (results[1]) {
          map.setZoom(4);
    randomLocation = (results[(results.length-1)].formatted_address);
    newsLocalityLocal = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?fq=glocations:'+'"'+randomLocation+'"'+'=20120101&api-key=85bb8c0adbf93a2930ec27229bc6eb2d:5:74093223';
    getNewsArticle();
        
      } else { 
    console.log(status);
    setTimeout(main,1000);
    }
    }  else if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
      console.log(status);
      setTimeout(main, 1000)
    } else { 
    console.log(status);
    setTimeout(main,250);
    }
  });
  }

//gets news data from nytimes 
var getNewsArticle = function() {
var xhr = new XMLHttpRequest();
xhr.open("GET", newsLocalityLocal , false);
xhr.send();
newsData = JSON.parse(xhr.responseText);
newsDataDocs = newsData.response.docs;
  if (newsDataDocs === []){
    main();
  }
console.log(newsData);
console.log(newsDataDocs);
console.log(newsLocalityLocal);
console.log(randomLocation);

info();

};

//grabs article
var grabArticle = function(x) {
  if (newsDataDocs[x]) {
    article = newsDataDocs[x].snippet;
    articleUrl = newsDataDocs[x].web_url;
    articleLink = '"<a href='+articleUrl+'>'+articleUrl+'</a>"';
  } else {
    main();
  }
}

//grabs image
var grabImg = function(x) {
    if (newsDataDocs[x].multimedia[0]){
    localNewsImgUrl = newsDataDocs[x].multimedia[0].url;
    imgUrl = 'http://www.nytimes.com/'+ localNewsImgUrl;
    articleImg = '"<img src='+imgUrl+'>"';
        } else {
  articleImg = "Sorry! (No picture data for this article)";
        }
    }

//sets infowindow
var setInfoWindow = function() {

    var infowindow = new google.maps.InfoWindow({
    position:myCenter,
  });
    
    infowindow.setContent(article + "<br>" + "<br>" + articleLink + "<br>" + "<br>" + articleImg + "<br>" + "<br>" + "Country:" + "  " + randomLocation);
    infowindow.open(map);
    console.log(infowindow);
  }

//Main Function 
var main = function() {
  initMap();
  getCountry(getNewsArticle);
}

//event listener, runs main function on window load
google.maps.event.addDomListener(window, 'load', main);



var closeInfoWindow = function() {
    infoWindow.close();
};

google.maps.event.addListener(map, 'click', closeInfoWindow);

//Experimental functions below








