require("dotenv").config();
var keys= require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require("request");
const fs = require('fs')


var liriCommande= process.argv[2];
var optionCommande = process.argv[3];

function liri(argOne, argTwo){
    // -----------------------------TWITTER API-----------------------------------------
    if(argOne === "my-tweets"){
      var client = new Twitter(keys.twitter);

      client.get('statuses/user_timeline', { screen_name: "yaotaylor"}, function(error, tweets, response) {
        if(error) return console.log(error);
        // console.log(JSON.stringify(tweets, null, 2));
        for(var i=0; i<tweets.length; i++){
          
          var tweetDate = "\nTweets date: " +" "+ tweets[i].created_at;
          var Tweet = "\nTweets: " +" "+ tweets[i].text +"\n\n-------------------------------------------------------------------------------";
          console.log(tweetDate);
          console.log(Tweet);
          var tweetInfos = tweetDate + Tweet;
            fs.appendFile('./log.txt',tweetInfos  + "\n ---------------------------------------------------------------------------",encoding='utf8', (err) => {
          
            })
          }
          console.log("\n \n*********************************************************************************")
          
          fs.appendFile('./log.txt',"\n \n  *********************************************************************************************************************",encoding='utf8', (err) => {
          
          })

      });
      
      } 

        // ------------------------------SPOTIFY API------------------------------------------


    if(argOne === "spotify-this-song" && !argTwo){
      var spotify = new Spotify(keys.spotify);
      var defaultargTwo = "The Sign";
      spotify.search({ type: 'track', query: defaultargTwo,limit: 1}, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
      // console.log(data);
      // console.log(data.tracks.items);
      for(var i=0; i<data.tracks.items.length; i++){
        var artists = " Artist:"+ data.tracks.items[0].artists[0].name;
        var songName = " Song name:" + data.tracks.items[0].name;
        var songLink = " Song Link:"+ data.tracks.items[0].external_urls.spotify;
        var Album = " Album:"+ data.tracks.items[0].album.name;
        console.log(artists);
        console.log(songName);
        console.log(songLink);
        console.log(Album);
        console.log("\n \n*********************************************************************************")

        var songInfos=[];
        songInfos.push(artists,songName,songLink,Album, "\n \n*********************************************************************************");
        for(i=0; i<songInfos.length; i++){
          fs.appendFile('./log.txt',"\n"+songInfos[i],encoding='utf8', (err) => {
          
          })
        }
        
      }
      });
    }else if (argOne === "spotify-this-song"){
      var spotify = new Spotify(keys.spotify);
        spotify.search({ type: 'track', query: argTwo,limit: 1}, function(err, data) {
          if (err) {
            return console.log('Error occurred: ' + err);
          }
        // console.log(data);
        // console.log(data.tracks.items);
        for(var i=0; i<data.tracks.items.length; i++){
          var artists = " Artist:"+ data.tracks.items[0].artists[0].name;
          var songName = " Song name:" + data.tracks.items[0].name;
          var songLink = " Song Link:"+ data.tracks.items[0].external_urls.spotify;
          var Album = " Album:"+ data.tracks.items[0].album.name;
          console.log(artists);
          console.log(songName);
          console.log(songLink);
          console.log(Album);
          console.log("\n \n*********************************************************************************")

          var songInfos=[];
          songInfos.push(artists,songName,songLink,Album,"\n \n*********************************************************************************" );
          for(i=0; i<songInfos.length; i++){
            fs.appendFile('./log.txt',"\n"+songInfos[i],encoding='utf8', (err) => {
            
            })
          }
          
        }
      });

    }
    
    // -------------------------------------OMDB API--------------------------------------
      
    if(argOne === "movie-this" && !argTwo){
        var omdbKey = keys.omdb;
        request('http://www.omdbapi.com/?apikey=' + omdbKey + '&t=Mr nobody', 
          function (error, response, body) {
            const data = JSON.parse(body);
            console.log('error:', error); 
            // console.log(data);
            var title = 'Title:' + data.Title;
          var year = 'Year:'+ data.Year;
          var ImdbRating = 'IMDB rating:' + data.imdbRating;
          var rotten = 'Rotten tomatoes rating:'+ data.Ratings[1].Value;
          var country = 'Country:'+data.Country;
          var language = 'Language:'+ data.Language;
          var plot = 'Plot:' + data.Plot;
          var actors = 'Actors:' + data.Actors;
          console.log(title);
          console.log(year);
          console.log(ImdbRating);
          console.log(rotten);
          console.log(country);
          console.log(language),
          console.log(plot);
          console.log(actors);
          console.log("\n \n*********************************************************************************")
          var moviInfos =[]
          moviInfos.push(title, year,ImdbRating, rotten,country,language,plot,actors, "\n \n*********************************************************************************")

          for(var i=0; i<moviInfos.length; i++){
            var displayInfos = "\n"+moviInfos[i];
            fs.appendFile('./log.txt',displayInfos,encoding='utf8', (err) => {
            
            })
          }
          
        });
    }else if(argOne === "movie-this"){
      var omdbKey = keys.omdb;
      request('http://www.omdbapi.com/?apikey=' + omdbKey + '&t=' + argTwo, 
        function (error, response, body) {
          const data = JSON.parse(body);
          if(error){
            console.log('error:', error);
          }
          //console.log('body:', data); 
          var title = 'Title:' + data.Title;
          var year = 'Year:'+ data.Year;
          var ImdbRating = 'IMDB rating:' + data.imdbRating;
          var rotten = 'Rotten tomatoes rating:'+ data.Ratings[1].Value;
          var country = 'Country:'+data.Country;
          var language = 'Language:'+ data.Language;
          var plot = 'Plot:' + data.Plot;
          var actors = 'Actors:' + data.Actors;
          console.log(title);
          console.log(year);
          console.log(ImdbRating);
          console.log(rotten);
          console.log(country);
          console.log(language),
          console.log(plot);
          console.log(actors);
          console.log("\n \n*********************************************************************************")

          var moviInfos =[]
          moviInfos.push(title, year,ImdbRating, rotten,country,language,plot,actors, "\n \n*********************************************************************************")

          for(var i=0; i<moviInfos.length; i++){
            var displayInfos = "\n"+moviInfos[i];
            fs.appendFile('./log.txt',displayInfos,encoding='utf8', (err) => {
            
            })
          }
          
            
      });
    }

    // -----------------------------------fs package---------------------------------------

    if (argOne === "do-what-it-says"){

      fs.readFile('./random.txt','utf8',function(error, data) {
        if(error){
          console.log("Eror: " + error);
        }
        console.log(data);
        console.log("\n \n*********************************************************************************")
        fs.appendFile('./log.txt',"\n"+data + "\n \n  ********************************************************************************",encoding='utf8', (err) => {
                
        });
    // ---------------------calling the SPOTIFY-API---------------------------------------
        liri("spotify-this-song", "I Want it That Way");

      })
    }
    
  
}
liri(liriCommande, optionCommande);