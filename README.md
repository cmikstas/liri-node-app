# liriBot

**What does this project do?**

This project uses the following APIs:

* Bands In Town
* Spotify
* OMDB

A user is then able to enter one of the of following four commands into Git Bash to query one of the APIs for information:

* concert-this
    * This will query the Bands in Town API to grab concert information for an artist.

* spotify-this-song
    * This will query the Spotify API and pull up information about a song that was entered.

* movie-this
    * This will query the OMDB API and provide information about a movie that is entered.

* do-what-it-says
    * This will query the Spotify API for a song name "I Want It That Way" and is pulled from a text file called random.txt.

This project will also log any searched information into a text file called "log.txt"

**Why is this project useful?**

This project has been helpful for me, the creator of it, to better understand how to query APIs using node and, in general, getting a better understanding of how to work in the command console.

**How can users get started with this project?**

If the user has this project on their machine and is in Git Bash they can use it via the following method:

No matter which API the user wants to call, they will need to be in the project file in Git Bash and enter - node liri.js -

Below are the commands for each API to be queried after entering node liri.js:

* Bands in Town: concert-this "name of the artist to search for"
* Spotify: spotify-this-song "name of the song to search for"
* OMDB: movie-this "name of the movie to search for"
* Random command: do-what-it-says

**Where users can get help with your project?**

Please refer to the follow links for help using this project.

* Bands in Town API: <https://github.com/cmikstas/liri-node-app/blob/master/projectHelpGifs/concert-this.gif>
* Spotify API: <https://github.com/cmikstas/liri-node-app/blob/master/projectHelpGifs/spotify-this-song.gif>
* OMDB API: <https://github.com/cmikstas/liri-node-app/blob/master/projectHelpGifs/movie-this.gif>
* random.txt file: <https://github.com/cmikstas/liri-node-app/blob/master/projectHelpGifs/do-what-it-says.gif>

**Who maintains and contributes to the project?**

This project was completed by Chris Mikstas on 10/2019.