# WeatherApp
How To Use 🔧 From your command line, first clone WeatherApp:

Clone this repository
$ git clone https://github.com/fragkos-ioannis/WeatherApp.git

Go into the repository
$ cd path/WeatherApp

Remove current origin repository
$ git remote remove origin

Then you can install the dependencies

Using NPM:

Install dependencies
$ npm install

Setting env variables
Rename sample.env file in WeatherApp folder to .env
Go to https://openweathermap.org/ subscribe to the API and gain your API Key. Copy the key value into WEATHER_API_KEY env variable. Do the same also for the https://opencagedata.com/ API and paste the API key in the GEOCODING_API_KEY variable.
Run on localhost
$ nodemon server.js
open in Web localhost:3000
