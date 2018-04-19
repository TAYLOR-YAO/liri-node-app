require("dotenv").config();
var keys= require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require("request");
const fs = require('fs')


var argOne = process.argv[2];
var argTwo = process.argv[3];

    // -----------------------------TWITTER API-----------------------------------------

if(argOne === "my-tweets"){
  var client = new Twitter(keys.twitter);

  client.get('statuses/user_timeline', { screen_name: "yaotaylor"}, function(error, tweets, response) {
    if(error) return console.log(error);
    // console.log(JSON.stringify(tweets, null, 2));
    for(var i=0; i<tweets.length; i++){
      console.log("Tweets date: " +" "+ tweets[i].created_at)
      console.log("Tweets: " +" "+ tweets[i].text)
    }
    
  });
  } 

    // ------------------------------SPOTIFY API------------------------------------------

if(argOne === "spotify-this-song"){
    var spotify = new Spotify(keys.spotify);
    spotify.search({ type: 'track', query: argTwo }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
    // console.log(data);
    // console.log(data.tracks.items);
    for(var i=0; i<data.tracks.items.length; i++){
      console.log(" Artist:", data.tracks.items[0].artists[0].name);
      console.log(" Son name:", data.tracks.items[0].name);
      console.log(" Son Link:", data.tracks.items[0].external_urls.spotify);
      console.log(" Album:", data.tracks.items[0].album.name);
      
    }
  });
}else if (argOne === "spotify-this-song" && argTwo === ""){

    var spotify = new Spotify(keys.spotify);
    var defaultargTwo = "The Sign";
    spotify.search({ type: 'track', query: defaultargTwo }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
    // console.log(data);
    // console.log(data.tracks.items);
      for(var i=0; i<data.tracks.items.length; i++){
        console.log(" Artist:", data.tracks.items[0].artists[0].name);
        console.log(" Son name:", data.tracks.items[0].name);
        console.log(" Son Link:", data.tracks.items[0].external_urls.spotify);
        console.log(" Album:", data.tracks.items[0].album.name);
        
      }
    });
 
}
 
// -------------------------------------OMDB API--------------------------------------
  
if(argOne === "movie-this"){
  
    var omdbKey = keys.omdb;
    request('http://www.omdbapi.com/?apikey=' + omdbKey + '&t=' + argTwo, 
      function (error, response, body) {
      console.log('error:', error); 
    // console.log('statusCode:', response && response.statusCode);
      console.log('body:', JSON.stringify(body , null , 2)); 
      console.log('Title:',body.Title);
    });
}else if(argOne === "movie-this" && argTwo === ""){

    var omdbKey = keys.omdb;
    request('http://www.omdbapi.com/?apikey=' + omdbKey + '&t=Mr. Nobody', 
      function (error, response, body) {
      console.log('error:', error); 
    // console.log('statusCode:', response && response.statusCode);
      console.log('body:', JSON.stringify(body , null , 2)); 
      console.log('Title:',body.Title);
    });
}

// -----------------------------------fs package---------------------------------------

if (argOne === "do-what-it-says"){

  fs.readFile('./random.txt','utf8',function(error, data) {
    if(error){
      console.log("Eror: " + error);
    }
    console.log(data);
// ---------------------calling the SPOTIFY-API---------------------------------------

    var spotify = new Spotify(keys.spotify);
    var defaultargTwo = "The Sign";
    spotify.search({ type: 'track', query: defaultargTwo }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
    // console.log(data);
    // console.log(data.tracks.items);
      for(var i=0; i<data.tracks.items.length; i++){
        console.log(" Artist:", data.tracks.items[0].artists[0].name);
        console.log(" Son name:", data.tracks.items[0].name);
        console.log(" Son Link:", data.tracks.items[0].external_urls.spotify);
        console.log(" Album:", data.tracks.items[0].album.name);
        
      }
    });

  })
}
 
