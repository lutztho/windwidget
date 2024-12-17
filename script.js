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
                const winddir = data.observations[0].winddir;  // Wind direction in degrees
                const windSpeed = data.observations[0].metric.windSpeed; // Wind speed in m/s
                const windGust = data.observations[0].metric.windGust;  // Wind gust in m/s
            
     // Update the HTML with the data
                document.getElementById('location').innerText = `${stationId}`; // Set the location name
                document.getElementById('windSpeedGust').innerText = `${winddir}° ${windSpeed} / ${windGust}`; // Combined Wind Speed / Wind Gust
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
