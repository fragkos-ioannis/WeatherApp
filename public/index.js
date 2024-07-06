import { elements } from './services/elements.js';
import { changeBackgroundImage, updateDateTime } from './services/functions.js';

window.addEventListener('load', () => {
    let long;
    let lat;
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const base = `/api/weather?lat=${lat}&lon=${long}`;

            fetch(base)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`Server error: ${response.status}`);
                    }
                    return response.json();
                })
                .then((data) => {
                    const { temp, feels_like, temp_min, temp_max, pressure, humidity, sea_level } = data.main;
                    const place = data.name;
                    const { speed, deg } = data.wind;
                    const visibility = data.visibility;
                    const { all } = data.clouds;
                    const { description, icon } = data.weather[0];
                    const { sunrise, sunset } = data.sys;

                    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

                    const sunriseGMT = new Date(sunrise * 1000);
                    const sunsetGMT = new Date(sunset * 1000);

                    elements.country.textContent = place;
                    elements.mainTemp.textContent = Math.round(temp);
                    elements.disc.textContent = description;
                    elements.tempHigh.textContent = Math.round(temp_max);
                    elements.tempLow.textContent = Math.round(temp_min);
                    elements.windSpeed.textContent = `${Math.round(speed * 3.6)} km/h`;
                    elements.windDir.textContent = `Direction: ${deg}°`;
                    elements.hum.textContent = `${humidity}%`;
                    elements.realFeel.textContent = Math.round(feels_like);
                    elements.vis.textContent = `${visibility} m`;
                    elements.press.textContent = `${pressure} hPa`;
                    elements.clouds.textContent = `${all}%`;
                    elements.seaLevel.textContent = `${sea_level} hPa`;
                    elements.sunRise.textContent = `Rise: ${sunriseGMT.toLocaleTimeString()}`;
                    elements.sunSet.textContent = `Set: ${sunsetGMT.toLocaleTimeString()}`;
                    elements.weatherIconImg.src = iconUrl;

                    elements.noData.style.display = 'none';
                    elements.weatherIconImg.style.display = 'block';
                    elements.countryElement.style.top = 0;
                    elements.form.style.bottom = 0;
                    elements.form.style.top = '1%';
                    changeBackgroundImage(description);
                })
        }, (error) => {
            console.error('Geolocation error:', error);
        });
    }
});

elements.searchBtn.addEventListener('click', async () => {
    const location = elements.searchInput.value;

    const geoRequestUrl = `/api/geocode?location=${encodeURIComponent(location)}`;

    try {
        const geocodingResponse = await fetch(geoRequestUrl);
        const geocodingData = await geocodingResponse.json();
        //console.log('Geocoding data fetched:', geocodingData);

        if (geocodingData.results.length > 0) {
            const { lat, lng } = geocodingData.results[0].geometry;

            const weatherApiUrl = `/api/weather?lat=${lat}&lon=${lng}`;
            const weatherResponse = await fetch(weatherApiUrl);
            const weatherData = await weatherResponse.json();
            //console.log('Weather data fetched:', weatherData);

            if (weatherData) {
                const { temp, feels_like, temp_min, temp_max, pressure, humidity, sea_level } = weatherData.main;
                const place = weatherData.name;
                const { speed, deg } = weatherData.wind;
                const visibility = weatherData.visibility;
                const { all } = weatherData.clouds;
                const { description, icon } = weatherData.weather[0];
                const { sunrise, sunset } = weatherData.sys;

                const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

                const sunriseGMT = new Date(sunrise * 1000);
                const sunsetGMT = new Date(sunset * 1000);

                elements.country.textContent = place;
                elements.mainTemp.textContent = Math.round(temp);
                elements.disc.textContent = description;
                elements.tempHigh.textContent = Math.round(temp_max);
                elements.tempLow.textContent = Math.round(temp_min);
                elements.windSpeed.textContent = `${Math.round(speed * 3.6)} km/h`;
                elements.windDir.textContent = `Direction: ${deg}°`;
                elements.hum.textContent = `${humidity}%`;
                elements.realFeel.textContent = Math.round(feels_like);
                elements.vis.textContent = `${visibility} m`;
                elements.press.textContent = `${pressure} hPa`;
                elements.clouds.textContent = `${all}%`;
                elements.seaLevel.textContent = `${sea_level} hPa`;
                elements.sunRise.textContent = `Rise: ${sunriseGMT.toLocaleTimeString()}`;
                elements.sunSet.textContent = `Set: ${sunsetGMT.toLocaleTimeString()}`;
                elements.weatherIconImg.src = iconUrl;

                elements.noData.style.display = 'none';
                elements.weatherIconImg.style.display = 'block';
                elements.countryElement.style.top = 0;
                elements.form.style.bottom = 0;
                elements.form.style.top = '1%';
                changeBackgroundImage(description);
            } else {
                console.log('Weather data NOT found.');
            }
        } else {
            console.log('No results found');
        }
    } catch (error) {
        console.error('Error fetching location data:', error);
    }
});

// Update the date and time immediately
updateDateTime();

// Update the date and time every second
setInterval(updateDateTime, 1000);
