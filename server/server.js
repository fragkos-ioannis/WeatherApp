import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Middleware to serve static files
//app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.json());

// API routes
app.get('/api/weather', async (req, res) => {
    const { lat, lon } = req.query;
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
        params: {
          lat,
          lon,
          appid: process.env.WEATHER_API_KEY,
          units: 'metric'
        }
      });
      res.json(response.data);
    } catch (error) {
      res.status(500).send('Error fetching weather data');
    }
});
  
app.get('/api/geocode', async (req, res) => {
const { location } = req.query;
try {
    const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json`, {
    params: {
        key: process.env.GEOCODING_API_KEY,
        q: location,
        pretty: 1,
        no_annotations: 1
    }
    });
    res.json(response.data);
} catch (error) {
    res.status(500).send('Error fetching geocode data');
}
});
  
app.listen(port, () => {
console.log(`Server running at http://localhost:${port}`);
});