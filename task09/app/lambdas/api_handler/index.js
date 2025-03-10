const weatherSDK = require('/opt/weather-sdk'); // Importing from Lambda Layer

exports.handler = async (event) => {
    console.log("Received event:", JSON.stringify(event));

    // Extract the request path and HTTP method
    const path = event.rawPath;
    const method = event.requestContext.http.method;

    // Check if the request is for /weather with GET method
    if (path === "/weather" && method === "GET") {
        try {
            const weatherData = await weatherSDK.getWeatherForecast(); // Fetch weather data from the SDK

            return {
                statusCode: 200,
                body: JSON.stringify(weatherData),
                headers: {
                    "content-type": "application/json"
                },
                isBase64Encoded: false
            };
        } catch (error) {
            console.error("Error fetching weather data:", error);
            return {
                statusCode: 500,
                body: JSON.stringify({ message: "Internal Server Error" }),
                headers: { "content-type": "application/json" }
            };
        }
    } else {
        return {
            statusCode: 400,
            body: JSON.stringify({
                statusCode: 400,
                message: `Bad request syntax or unsupported method. Request path: ${path}. HTTP method: ${method}`
            }),
            headers: { "content-type": "application/json" },
            isBase64Encoded: false
        };
    }
};
