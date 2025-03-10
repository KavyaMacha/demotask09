const axios = require("axios");

exports.handler = async (event) => {
    try {
        const response = await axios.get("https://api.open-meteo.com/v1/forecast", {
            params: {
                latitude: 40.7128,
                longitude: -74.006,
                hourly: "temperature_2m,relative_humidity_2m,wind_speed_10m"
            }
        });

        console.log("API Response:", response.data); // Debugging log

        if (!response.data.hourly) {
            throw new Error("Missing hourly data in API response");
        }

        return {
            statusCode: 200,
            body: JSON.stringify(response.data.hourly)
        };

    } catch (error) {
        console.error("Error fetching weather data:", error.message);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to fetch weather data" })
        };
    }
};
