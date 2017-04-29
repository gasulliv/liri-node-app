//setting variables
var keys = require("./keys.js");
var fs = require("fs");
var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
var client = keys.twitterKeys;

var command = process.argv[2];
var params = process.argv[3];



var getArtistNames = function(artist){
	return artist.name;
};

var getMeSpotify = function(songName) {


	if (songName === undefined) {
		songName = "What's my age again";
	}


	spotify.search({ type: "track", query: songName}, function (err, data) {
            if (err) {
                console.log('Error occurred: ' + err);
                return;
            }

            var songs = data.tracks.items;

            for (var i = 0; i < songs.length; i++) {


            console.log("The song you searched for is " + songs[i].artists.map(getArtistNames));
            console.log("The name of the Artist found is " + songs[i].name);
            console.log("Song Preview " + songs[i].preview_url);
            console.log("Album: " + songs[i].album.name);
            console.log("---------------------------------");
        }
     });

};



var getMeMovie = function(movieName){

	var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&r=json";
        request(queryUrl, function (error, response, body) {


        	// console.log(body);

            // If the request was successful...
            if (!error && response.statusCode === 200) {
                console.log(JSON.parse(body));

             console.log(JSON.parse(body));
             console.log("Movie Title: " + JSON.parse(body).Title);
             console.log("Year Released: " + JSON.parse(body).Year);
             console.log("Movie Rating: " + JSON.parse(body).imdbRating);
             console.log("Movie Genre: " + JSON.parse(body).Genre);
             console.log("Movie Director: " + JSON.parse(body).Director);
             console.log("Movie Actors " + JSON.parse(body).Actors);

         	}

            else {

              console.log(error);
         	}
	});

};


var getMyTweets = function() {

	console.log("hello world");

	console.log(keys);
	var client = new Twitter (keys.twitterKeys);

	var params = {
		screen_name: "gasullivart1"
	};


client.get('statuses/user_timeline', params, function(error, tweets, response) {

  if (!error) {

     console.log("Here are your tweets!");
                for (var i = 0; i  < tweets.length; i++) {
                	console.log(tweets[i].created_at);
                    console.log(tweets[i].text);
  		}
  	}

  else {
  	console.log(error);
  }

});

};

//console logging errors

if (command === "getMeSpotify"){
	getMeSpotify(params);
}

else if (command === "getMeMovie"){

	getMeMovie(params);
}

else if (command === "getMyTweets"){

	getMyTweets();
}

else {
	console.log(error);
}




