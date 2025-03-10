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

        // 🛠 Log the response for debugging
        console.log("API Response:", JSON.stringify(response.data, null, 2));

        // ✅ Ensure response contains 'hourly' and its fields
        if (!response.data.hourly || !response.data.hourly.time) {
            throw new Error("Invalid API response: 'hourly' data missing.");
        }

        return response.data;
    } catch (error) {
        console.error("Error fetching weather data:", error.message);
        throw new Error("Failed to fetch weather data.");
    }
}

module.exports = { getWeatherForecast };
