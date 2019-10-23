/**********VARIABLES**********/

// require items
require("dotenv").config();

var axios = require("axios");
var fs = require("fs");
var keys = require("./keys.js");
var moment = require("moment");
var Spotify = require("node-spotify-api");

// process.argv variables
var command = process.argv[2];
var apiParam = process.argv[3];

// API keys
var queryUrlBIT = "https://rest.bandsintown.com/artists/" + apiParam + "/events?app_id=codingbootcamp";
var spotify = new Spotify(keys.spotify);
var queryUrlOMDB = "http://www.omdbapi.com/?t=" + apiParam + "&y=&plot=short&apikey=trilogy";

/**********CALLING runLIRI()**********/

runLIRI();

/**********FUNCTION SECTION**********/

// main function that contains case statement to control which command is entered in node
function runLIRI()
{
    if (command === undefined)
    {
        console.log("please enter a valid command");
        return;
    }

    switch(command.toLowerCase())
    {
        case "concert-this":
            runBIT();
            break;

        case "spotify-this-song":
            runSpot();
            break;

        case "movie-this":
            runOMDB();
            break;

        case "do-what-it-says":
            runRandom();
            break;

        default:
            console.log("please enter a valid command");
            break;
    }
}

// function that controls bands in town API
function runBIT()
{
    checkApiParam();

    axios.get(queryUrlBIT).then(
        function(response)
        {
            //console.log(response.data);
            for (var i = 0; i < response.data.length; i++)
            {
                //console.log(response.data[i].venue);
                var artist = "Artist: " + response.data[i].lineup;
                console.log(artist);

                var venue = "Venue Name: " + response.data[i].venue.name;
                console.log(venue);

                var venueLoc = "Venue Location: " + response.data[i].venue.city + ", " + response.data[i].venue.country;
                console.log(venueLoc);

                // moment and split functions to get date and time into correct format
                var dateArray = response.data[i].datetime.split("T");
                var date = dateArray[0];
                var time = dateArray[1];
                var properDate = moment(date);

                var eventDate = "Event Date: " + properDate.format("MM/DD/YYYY");
                console.log(eventDate);

                var eventTime = "Event Time: " + time;
                console.log(eventTime);

                var lineBreak = "\n------------------------------\n";
                console.log(lineBreak);

                var dataBIT = "BANDS IN TOWN DATA:" + "\n" + artist + "\n" + venue + "\n" + venueLoc + "\n" + eventDate + "\n" + eventTime + "\n" + lineBreak;

                addToLog(dataBIT);
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

// function that controls Spotify API
function runSpot()
{
    checkApiParam();

    spotify.search(
        {
            type: 'track', 
            query: apiParam
        }, 
        function(err, data)
        {
            if (err)
            {
                return console.log('Error occurred: ' + err);
            }
       
            //console.log(data.tracks.items); 
            for (var i = 0; i < data.tracks.items.length; i++)
            {
                var artist1 = "Artist: " + data.tracks.items[i].artists[0].name;
                console.log(artist1);

                var song = "Song: " + data.tracks.items[i].name;
                console.log(song);

                var album = "Album: " + data.tracks.items[i].album.name;
                console.log(album);

                var preview = "Preview Link: " + data.tracks.items[i].preview_url;
                console.log(preview);

                var lineBreak1 = "\n------------------------------\n"
                console.log(lineBreak1);

                var dataSpot = "SPOTIFY DATA:" + "\n" + artist1 + "\n" + song + "\n" + album + "\n" + preview + "\n" + lineBreak1;

                addToLog(dataSpot);
            }
        }
    );
}

// function that controls OMDB API
function runOMDB()
{
    checkApiParam();

    axios.get(queryUrlOMDB).then(
        function(response)
        {
            //console.log(response.data.Ratings);
            var movieTitle = "Movie Title: " + response.data.Title;
            console.log(movieTitle);

            var releaseYear = "Release Year: " + response.data.Year;
            console.log(releaseYear);

            var ratingIMDB = "IMDB Rating: " + response.data.imdbRating;
            console.log(ratingIMDB);

            var ratingRT = "Rotten Tomatoes Rating: " + response.data.Ratings[1].Value;
            console.log(ratingRT);

            var produced = "Country Produced: " + response.data.Country;
            console.log(produced);

            var plot = "Plot: " + response.data.Plot;
            console.log(plot);

            var starring = "Starring: " + response.data.Actors;
            console.log(starring);

            dataOMDB = "OMDB DATA:" + "\n" + movieTitle + "\n" + releaseYear + "\n" + ratingIMDB + "\n" + ratingRT + "\n" + produced + "\n" + plot + "\n" + starring;

            addToLog(dataOMDB);
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

// function that controls information from random.txt
function runRandom()
{
    fs.readFile("./random.txt", "utf8", function(error, data)
    {
        // If the code experiences any errors it will log the error to the console.
        if (error)
        {
            return console.log(error);
        }

        var data1 = data.split(",");
        //console.log(data1);
    
        command = data1[0];
        apiParam = data1[1];
    
        runSpot();
    });
}

// function that logs data from terminal/bash window to log.txt file
function addToLog(data)
{
    fs.appendFile("./log.txt", data, function (err)
    {

        if (err) throw err;
        //console.log('Saved!');

    });
}

// function that checks to see if apiParam variable is blank or not
function checkApiParam()
{
    if (apiParam === undefined)
    {
        switch(command)
        {
            case "concert-this":
                apiParam = "Celine Dion";
                queryUrlBIT = "https://rest.bandsintown.com/artists/" + apiParam + "/events?app_id=codingbootcamp";
                break;

            case "spotify-this-song":
                //console.log(apiParam);
                apiParam = "The Sign, Ace of Base";
                break;

            case "movie-this":
                apiParam = "Mr Nobody";
                //console.log(apiParam);
                queryUrlOMDB = "http://www.omdbapi.com/?t=" + apiParam + "&y=&plot=short&apikey=trilogy";
                break;
        }
    }
}