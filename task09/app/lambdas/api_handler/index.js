const weatherSDK = require('/opt/weather-sdk');

exports.handler = async (event) => {
    console.log("Received event:", JSON.stringify(event));

    const path = event.rawPath;
    const method = event.requestContext.http.method;

    if (path === "/weather" && method === "GET") {
        try {
            const weatherData = await weatherSDK.getWeatherForecast();

            if (!weatherData.hourly) {
                return {
                    statusCode: 500,
                    body: JSON.stringify({ message: "Weather API response is invalid." }),
                    headers: { "content-type": "application/json" }
                };
            }

            return {
                statusCode: 200,
                body: JSON.stringify(weatherData),
                headers: { "content-type": "application/json" }
            };
        } catch (error) {
            return {
                statusCode: 500,
                body: JSON.stringify({ message: "Internal Server Error: " + error.message }),
                headers: { "content-type": "application/json" }
            };
        }
    } else {
        return {
            statusCode: 400,
            body: JSON.stringify({
                message: `Bad request syntax or unsupported method. Request path: ${path}. HTTP method: ${method}`
            }),
            headers: { "content-type": "application/json" }
        };
    }
};
