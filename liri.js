// require("dotenv").config();
var keys= require("./keys.js");
var Twitter = require('twitter');
var omdb = require('omdb');
var argOne = process.argv[2];
var argTwo = process.argv[3];

var omdbApiKey = "e443c6de";
var client = new Twitter(keys.twitter);


var userName = { screen_name:argOne + "" + argTwo,
                count: 2 };

client.get('statuses/user_timeline', userName, function(error, tweets, response) {
    if(error) throw error;
    console.log(tweets);  // The favorites. 
    console.log(response);  // Raw response object. 
  });
