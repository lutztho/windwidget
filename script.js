// Function to fetch the data from the API
function fetchWeatherData() {
    const apiUrl = "https://api.weather.com/v2/pws/observations/current?apiKey=e1f10a1e78da46f5b10a1e78da96f525&stationId=IBOLVA20&format=json&units=m";
    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Check if the response data has valid observations
            if (data.observations && data.observations.length > 0) {
                // Extract the relevant data
                const stationId = data.observations[0].neighborhood;
                const winddir = data.observations[0].winddir;  // Wind direction in degrees
                const windSpeed = data.observations[0].metric.windSpeed; // Wind speed in m/s
                const windGust = data.observations[0].metric.windGust;  // Wind gust in m/s
            
                // Update the HTML with the data
                document.getElementById('stationID').innerText = `${stationId}`; // Set the station ID
                document.getElementById('winddir').innerText = `Direction: ${winddir}°`; // Wind direction
                document.getElementById('windSpeed').innerText = `Wind Speed: ${windSpeed} m/s`; // Wind Speed
                document.getElementById('windGust').innerText = `Wind Gust: ${windGust} m/s`; // Wind Gust
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
