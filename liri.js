require("dotenv").config();
var keys= require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require("request");


var argOne = process.argv[2];
var argTwo = process.argv[3];

if(argOne === "my-tweets"){
  var client = new Twitter(keys.twitter);

  client.get('statuses/user_timeline', { screen_name: "Tayconnection"}, function(error, tweets, response) {
    if(error) return console.log(error);
    // console.log(JSON.stringify(tweets, null, 2));
    for(var i=0; i<tweets.length; i++){
      console.log(tweets[i].created_at)
      console.log(tweets[i].text)
    }
    
  });
  } 

if(argOne === "spotify-this-song"){
  var spotify = new Spotify(keys.spotify);
  spotify.search({ type: 'track', query: argTwo }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
  // console.log(data.tracks.items);
    for(var i=0; i<data.tracks.items.length; i++){
      console.log(data.tracks.items[i].album.name)
    }
  });
}

  
if(argOne === "movie-this"){
  
  var omdbKey = keys.omdb;
  request('http://www.omdbapi.com/?apikey=' + omdbKey + '&t=' + argTwo, 
    function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
   // console.log('statusCode:', response && response.statusCode);
    console.log('body:', JSON.stringify(body)); // Print the HTML for the Google homepage.
  });
}


 
