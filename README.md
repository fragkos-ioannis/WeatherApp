# WeatherApp
How To Use 🔧 From your command line, first clone WeatherApp:

### Clone this repository
$ git clone https://github.com/fragkos-ioannis/WeatherApp.git

### Go into the repository
$ cd WeatherApp

### Remove current origin repository
$ git remote remove origin

Then you can install the dependencies

Using NPM:

### Install dependencies
In client folder: $ npm install<br>
In server folder: $ npm install

### Setting env variables
1. In server folder rename sample.env file to .env
2. Go to https://openweathermap.org/ subscribe to the API and gain your API Key. Copy the key value into WEATHER_API_KEY env variable. Do the same also for the https://opencagedata.com/ API and paste the API key in the GEOCODING_API_KEY variable.

### Run on localhost
1. In server folder path run the command: npm run start
2. In client folder path run the command: npm run start
