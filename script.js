// Function to convert wind direction from degrees (0-360) to compass direction
function getCompassDirection(degrees) {
    // Normalize degrees to be within [0, 360)
    if (degrees < 0) degrees += 360;
    if (degrees >= 360) degrees -= 360;

    // Define the ranges for each direction
    if (degrees >= 348.75 || degrees < 11.25) return 'N'; // North (N)
    if (degrees >= 11.25 && degrees < 33.5) return 'NNE'; // North-North-East (NNE)
    if (degrees >= 33.5 && degrees < 56) return 'NE'; // North-East (NE)
    if (degrees >= 56 && degrees < 78.25) return 'ENE'; // East-North-East (ENE)
    if (degrees >= 78.25 && degrees < 101.5) return 'E'; // East (E)
    if (degrees >= 101.5 && degrees < 123.75) return 'ESE'; // East-South-East (ESE)
    if (degrees >= 123.75 && degrees < 146) return 'SE'; // South-East (SE)
    if (degrees >= 146 && degrees < 168.25) return 'SSE'; // South-South-East (SSE)
    if (degrees >= 168.25 && degrees < 191.5) return 'S'; // South (S)
    if (degrees >= 191.5 && degrees < 213.75) return 'SSW'; // South-South-West (SSW)
    if (degrees >= 213.75 && degrees < 236) return 'SW'; // South-West (SW)
    if (degrees >= 236 && degrees < 258.25) return 'WSW'; // West-South-West (WSW)
    if (degrees >= 258.25 && degrees < 281.5) return 'W'; // West (W)
    if (degrees >= 281.5 && degrees < 303.75) return 'WNW'; // West-North-West (WNW)
    if (degrees >= 303.75 && degrees < 326) return 'NW'; // North-West (NW)
    return 'NNW'; // North-North-West (NNW)
}
// Function to fetch the data from the API
function fetchWeatherData() {
    const apiUrl = document.body.getAttribute('data-api-url');
    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Check if the response data has valid observations
            if (data.observations && data.observations.length > 0) {
                // Extract the relevant data
                const stationId = data.observations[0].neighborhood;
                const winddir = data.observations[0].winddir;  // Wind direction in deg
                const windname = getCompassDirection(winddir);
                const windSpeed = data.observations[0].metric.windSpeed; // Wind speed in m/s
                const windGust = data.observations[0].metric.windGust;  // Wind gust in m/s
            
     // Update the HTML with the data
                document.getElementById('location').innerText = `${stationId}`; // Set the location name
                document.getElementById('windSpeedGust').innerText = `${windname} ${windSpeed} / ${windGust}`; // Combined Wind Speed / Wind Gust
            } else {
                console.error('No observations data found.');
                alert('Failed to fetch weather data: No data available.');
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            alert('Failed to fetch weather data.');
        });
}

// Fetch data immediately when the page loads
fetchWeatherData();

// Refresh the data every 60 seconds (60000 milliseconds)
setInterval(fetchWeatherData, 60000);
