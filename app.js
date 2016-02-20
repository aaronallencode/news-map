// Variables
var latMin = -40;
var latMax = 60;
var lonMin = -140;
var lonMax = 140;
var spin_button = '<button onClick="main()"  style="height:auto;width:50%;position:absolute;top:75%;left:40%;">Spin to another Random Location</button>';
var myCenter;
var myCenterPlus;
var newsData;
var newsDataDocs;
var randomLocation = "";
var map;
var region;
var newsLocalityLocal;
var localNewsImgUrl = "";
var imgUrl = "";
var article;
var articles;
var articlesSports;
var articlesForeign;
var articlesBusiness;
var articlesEditorial;
var articleImg = "";
var articleUrl = "";
var articleLink = "";
var total;
var section;
var infowindow;
var numberForeign;
var numberBusiness;
var numberEditorial;

//Individual Functions All Listed Below

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

//creates random integer to be used later to grab an article
var getRandomInt = function(x) {
  return Math.floor(Math.random() * x);
};
var randomArticleInt = getRandomInt(9);

var randomForeignInt;
var randomBusinessInt;
var randomEditorialInt;

//Initializes map
var initMap = function() {
  var randomLat = Math.random() * (latMax - latMin) + latMin;
  var randomLon = Math.random() * (lonMax - lonMin) + lonMin;
  myCenter = new google.maps.LatLng(randomLat,randomLon);
  myCenterPlus = new google.maps.LatLng(randomLat+10,randomLon);

  var myCenterString = myCenter.toString();
  var mapProp = {
    center: myCenterPlus,
    zoom: 3
  };

  map = new google.maps.Map(document.getElementById("map"),mapProp);
  

  infowindow = new google.maps.InfoWindow({
    position:myCenter,
  });

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

//gets news data from nytimes and uses map/filter to produce readable arrays
var getNewsArticle = function() {
var xhr = new XMLHttpRequest();
xhr.open("GET", newsLocalityLocal , false);
xhr.send();
newsData = JSON.parse(xhr.responseText);
newsDataDocs = newsData.response.docs;
  if (newsDataDocs === []){
    main();
  }

console.log(randomLocation);

articles = newsDataDocs.map(function(article){
      return {
          section: article.news_desk,
          snippet: article.snippet, 
          url: article.web_url, 
          media: article.multimedia.map(function(img){
            return img.url;
          })};
                })

articlesForeign = articles.filter(function(article){
  return article.section === "Foreign";
})

numberForeign = articlesForeign.length;
randomForeignInt = getRandomInt(numberForeign);

articlesBusiness = articles.filter(function(article){
  return article.section === "Business";
})

numberBusiness = articlesBusiness.length;
randomBusinessInt = getRandomInt(numberBusiness);

articlesEditorial = articles.filter(function(article){
  return article.section === "Editorial";
})

numberEditorial = articlesEditorial.length;
randomEditorialInt = getRandomInt(numberEditorial);

console.log("Foreign Articles" + ":" + numberForeign);
 console.log("Business Articles" + ":" + numberBusiness);
 console.log("Editorial Articles" + ":" + numberEditorial);

info();
};

//grabs foreign article
var grabForeignArticle = function(){
  if (articlesForeign[randomForeignInt]) {
    article = articlesForeign[randomForeignInt].snippet;
    articleUrl = articlesForeign[randomForeignInt].url;
    articleLink = '"<a href='+articleUrl+'>'+articleUrl+'</a>"';
    section = articlesForeign[randomForeignInt].section;
  } else {
    alert("No Foreign Articles Found, try another category/article or spin to a new location!");
  }
}

//grabs foreign img
var grabForeignImg = function() {
    if (articlesForeign[randomForeignInt].media[0]){
    localNewsImgUrl = articlesForeign[randomForeignInt].media[0];
    imgUrl = 'http://www.nytimes.com/'+ localNewsImgUrl;
    articleImg = '"<img src='+imgUrl+'>"';
        } else {
  articleImg = "Sorry! (No picture data for this article)";
        }
    }

//grabs business article
var grabBusinessArticle = function(){
  if (articlesBusiness[randomBusinessInt]) {
    article = articlesBusiness[randomBusinessInt].snippet;
    articleUrl = articlesBusiness[randomBusinessInt].url;
    articleLink = '"<a href='+articleUrl+'>'+articleUrl+'</a>"';
    section = articlesBusiness[randomBusinessInt].section;
  } else {
    alert("No Business Articles Found, try another category/article or spin to a new location!");
  }
}

//grabs business img
var grabBusinessImg = function() {
    if (articlesBusiness[randomBusinessInt].media[0]){
    localNewsImgUrl = articlesBusiness[randomBusinessInt].media[0];
    imgUrl = 'http://www.nytimes.com/'+ localNewsImgUrl;
    articleImg = '"<img src='+imgUrl+'>"';
        } else {
  articleImg = "Sorry! (No picture data for this article)";
        }
    }

//grabs editorial article
var grabEditorialArticle = function(){
  if (articlesEditorial[randomEditorialInt]) {
    article = articlesEditorial[randomEditorialInt].snippet;
    articleUrl = articlesEditorial[randomEditorialInt].url;
    articleLink = '"<a href='+articleUrl+'>'+articleUrl+'</a>"';
    section = articlesEditorial[randomEditorialInt].section;
  } else {
    alert("No Editorial Articles Found, try another category/article or spin to a new location!");
  }
}

var grabEditorialImg = function() {
    if (articlesEditorial[randomEditorialInt].media[0]){
    localNewsImgUrl = articlesEditorial[randomEditorialInt].media[0];
    imgUrl = 'http://www.nytimes.com/'+ localNewsImgUrl;
    articleImg = '"<img src='+imgUrl+'>"';
        } else {
  articleImg = "Sorry! (No picture data for this article)";
        }
    }

//grabs article
var grabArticle = function(x) {

  if (articles[0]) {
    article = articles[x].snippet;
    articleUrl = articles[x].url;
    articleLink = '"<a href='+articleUrl+'>'+articleUrl+'</a>"';
    section = articles[x].section;
    if (section === null){
      section = "Not Available"
    }
  } else {
    main();
  }
}

//grabs image
var grabImg = function(x) {
    if (articles[x].media[0]){
    localNewsImgUrl = articles[x].media[0];
    imgUrl = 'http://www.nytimes.com/'+ localNewsImgUrl;
    articleImg = '"<img src='+imgUrl+'>"';
        } else {
  articleImg = "Sorry! (No picture data for this article)";
        }
    }

//sets infowindow
var setInfoWindow = function() {
    infowindow.close();
    infowindow.setContent(article + "<br>" + "<br>" + articleLink + "<br>" + "<br>" + articleImg + "<br>" + "<br>" + "Country:" + " " + randomLocation + "<br>" + "<br>" + "Section:" + " " + section + spin_button);
    infowindow.open(map);
  }

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

//grabs sports information then sets window
var infoSports = function() { 
    grabSports();
}

//grabs foreign information then sets window
var infoForeign = function() {
  randomForeignInt = getRandomInt(numberForeign);
  console.log(randomForeignInt);

  grabForeignArticle();
  grabForeignImg();
  setInfoWindow();
}

//grabs business information then sets window
var infoBusiness = function() {
  randomBusinessInt = getRandomInt(numberBusiness);
  console.log(randomBusinessInt);

   grabBusinessArticle();
   grabBusinessImg();
   setInfoWindow();
}

//grabs editorial information then sets window
  

var infoEditorial = function() {
  randomEditorialInt = getRandomInt(numberBusiness);
  console.log(randomEditorialInt);

   grabEditorialArticle();
   grabEditorialImg();
   setInfoWindow();
}

//Main Function 
var main = function() {
  'use strict';
  initMap();
  getCountry(getNewsArticle);
}

//event listener, runs main function on window load
google.maps.event.addDomListener(window, 'load', main);











