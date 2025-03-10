const axios = require('axios');

async function getWeatherForecast() {
    const API_URL = "https://api.open-meteo.com/v1/forecast";
    const params = {
        latitude: 50.4375,
        longitude: 30.5,
        hourly: "temperature_2m,relative_humidity_2m,wind_speed_10m",
        current_weather: true
    };

    try {
        const response = await axios.get(API_URL, { params });
        return response.data;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        throw error;
    }
}

module.exports = { getWeatherForecast };
