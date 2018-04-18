require("dotenv").config();
var keys= require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var omdb = require('omdb');

var argOne = process.argv[2];
var argTwo = process.argv[3];
var omdb = require('omdb');

var omdbApiKey = "e443c6de";
var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);

if(argOne === "my-tweets"){
  var userName = { screen_name: "Tayconnection",
                count: 2 };

  client.get('statuses/user_timeline', userName, function(error, tweets, response) {
    if(error) return console.log(error);
    console.log(JSON.stringify(tweets, null, 2));
  });


  }else if(argOne === "spotify-this-song"){
    spotify.request('https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx')
    .then(function(data) {
      console.log(data);
    })
    .catch(function(err) {
      console.error('Error occurred: ' + err); 
    });

    // spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
    //   if (err) {
    //     return console.log('Error occurred: ' + err);
    //   }
    //  console.log(data)
    // //console.log(JSON.stringify(data)); 
    // });
  }else if(argOne === "movie-this"){
    
    var params = {
      api_key:omdbApiKey,
      query:'sow'
    }
    omdb.search(params, function(err, movies) {
    if(err) {
        return console.error(err);
    }
 
    if(movies.length < 1) {
        return console.log('No movies were found!');
    }
 
    movies.forEach(function(movie) {
        console.log('%s (%d)', movie.title, movie.year);
    });
 
    // Saw (2004) 
    // Saw II (2005) 
    // Saw III (2006) 
    // Saw IV (2007) 
    // ... 
    });
  }


 
