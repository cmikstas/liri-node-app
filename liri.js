require("dotenv").config();

var keys = require("./keys.js");

var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var apiParam = process.argv[3];

var axios = require("axios");

var queryUrlOMDB = "http://www.omdbapi.com/?t=" + apiParam + "&y=&plot=short&apikey=trilogy";
var queryUrlBIT = "https://rest.bandsintown.com/artists/" + apiParam + "/events?app_id=codingbootcamp";

//console.log(queryUrlOMDB);

if (command === "movie-this")
{
    runOMDB();
}

else if (command === "concert-this")
{
    runBIT();
}

function runBIT()
{
    axios.get(queryUrlBIT).then(
        function(response)
        {
            //console.log(response.data);
            for (var i = 0; i < response.data.length; i++)
            {
                //console.log(response.data[i].venue);
                console.log("Band Name: " + response.data[i].lineup);
                console.log("Venue Name: " + response.data[i].venue.name);
                console.log("Venue Location: " + response.data[i].venue.city + ", " + response.data[i].venue.country);
                console.log("Event Date: " + response.data[i].datetime);
                console.log("------------------------------");
            }
        })
        .catch(function(error)
        {
            if (error.response) 
            {
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } 
        
            else if (error.request)
            {
                console.log(error.request);
            } 
        
            else
            {
                console.log("Error", error.message);
            }
    
            console.log(error.config);
        }
    );
}

function runOMDB()
{
    axios.get(queryUrlOMDB).then(
        function(response)
        {
            //console.log(response.data.Ratings);
            console.log("Movie Title: " + response.data.Title);
            console.log("Release Year: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.imdbRating);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            console.log("Country Produced: " + response.data.Country);
            console.log("Plot: " + response.data.Plot);
            console.log("Starring: " + response.data.Actors);
        })
        .catch(function(error)
        {
            if (error.response) 
            {
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } 
        
            else if (error.request)
            {
                console.log(error.request);
            } 
        
            else
            {
                console.log("Error", error.message);
            }
    
            console.log(error.config);
        }
    );
}

