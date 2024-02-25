
async function getWeatherData() {
    const apiKey = 'a21fddacf001434b931115221242502';
    const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=Paris/&days=7`, {mode: 'cors'});

    const weather_data = await response.json();
    console.log(weather_data);
}

getWeatherData();