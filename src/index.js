import './style.css';

async function getWeatherData() {
    const apiKey = 'a21fddacf001434b931115221242502';
    const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=Paris/&days=7`, {mode: 'cors'});

    const weather_data = await response.json();
    console.log(weather_data)

    const current_day = {
        condition: weather_data.current.condition.text,
        icon: weather_data.current.condition.icon,
        date: weather_data.current.last_updated,
        feelsLike: {
            celsius: weather_data.current.feelslike_c,
            fahrenheit: weather_data.current.feelslike_f
        },
        wind: {
            kph: weather_data.current.wind_kph,
            mph: weather_data.current.wind_mph
        },
        humidity: weather_data.current.humidity,
        rain_chance: weather_data.forecast.forecastday[0].day.daily_chance_of_rain

    }

    console.log(current_day);
}

getWeatherData();