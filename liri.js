/**********VARIABLES**********/

// require items
require("dotenv").config();
var axios = require("axios");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");

// process.argv variables
var command = process.argv[2];
var apiParam = process.argv[3];

// query URL variables
var queryUrlBIT = "https://rest.bandsintown.com/artists/" + apiParam + "/events?app_id=codingbootcamp";
var spotify = new Spotify(keys.spotify);
var queryUrlOMDB = "http://www.omdbapi.com/?t=" + apiParam + "&y=&plot=short&apikey=trilogy";

/**********CALLING runLIRI**********/
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

// before making the case statement above, I created this series of if and else if statements
/**
if (command === "concert-this")
{
    runBIT();
}

else if (command === "spotify-this-song")
{
    runSpot();
}

else if (command === "movie-this")
{
    runOMDB();
}

else if (command === "do-what-it-says")
{
    runRandom();
}
*/

// function that controls bands in town api
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
                console.log("Band: " + response.data[i].lineup);
                console.log("Venue Name: " + response.data[i].venue.name);
                console.log("Venue Location: " + response.data[i].venue.city + ", " + response.data[i].venue.country);
                console.log("Event Date: " + response.data[i].datetime);
                console.log("\n------------------------------\n");
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

// function that controls spotify api
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
                console.log("Artist: " + data.tracks.items[i].artists[0].name);
                console.log("Song: " + data.tracks.items[i].name);
                console.log("Album: " + data.tracks.items[i].album.name);
                console.log("Preview Link: " + data.tracks.items[i].preview_url);
                console.log("\n------------------------------\n");
            }
        }
    );
}

// function that controls omdb api
function runOMDB()
{
    checkApiParam();

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

// function that controls information from random.txt
function runRandom()
{
    var fs = require('fs');

    var data = fs.readFileSync('./random.txt', 'utf8');
    console.log(data);

    var data1 = data.split(",");
    console.log(data1);

    command = data1[0];
    apiParam = data1[1];

    runSpot();

    /*
    Ask Nick what I was doing wrong here.

    fs.readFile("./random.txt", function (err, data)
    {
        if (err) throw err;

        console.log(data);
        //var data1 = data.split(",");
        //console.log(data1);
    
    });
    */
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

/*
function checkApiParam()
{
    if (apiParam === undefined)
    {
        if (command === "concert-this")
        {
            apiParam = "Celine Dion";
        
            queryUrlBIT = "https://rest.bandsintown.com/artists/" + apiParam + "/events?app_id=codingbootcamp";
        }

        else if (command === "spotify-this-song")
        {
            //console.log(apiParam);

            apiParam = "The Sign, Ace of Base";
        }

        else if (command === "movie-this")
        {
            apiParam = "Mr Nobody";
            //console.log(apiParam);
    
            queryUrlOMDB = "http://www.omdbapi.com/?t=" + apiParam + "&y=&plot=short&apikey=trilogy";
        }
    }
}
*/