import './style.css';

let city = "New York";

async function getWeatherData(city) {
    const apiKey = 'a21fddacf001434b931115221242502';
    const error_message = document.querySelector(".error");

    try {
        const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}/&days=7`, {mode: 'cors'});

        const weather_data = await response.json();
        console.log(weather_data)

        const current_day = {
            location: {
                country: weather_data.location.country,
                city: weather_data.location.name
            },
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
            temperature: {
                celsius: weather_data.current.temp_c,
                fahrenheit: weather_data.current.temp_f
            },
            humidity: weather_data.current.humidity,
            rain_chance: weather_data.forecast.forecastday[0].day.daily_chance_of_rain

        }

        const info = document.querySelector(".info");
        const temperature_data = document.querySelector(".temp-value");
        const temperature_symbol = document.querySelector(".temp-type");
        const temp_feels_like = document.querySelector(".temp-feels-like");
        const temp_type_feels_like = document.querySelector(".temp-type-feels-like");
        const humidity = document.querySelector(".humidity");
        const wind = document.querySelector(".wind")


        info.firstElementChild.textContent = current_day.condition;
        info.children[1].textContent = current_day.location.city + ", " + current_day.location.country; 
        temperature_data.textContent = current_day.temperature.celsius;
        temperature_symbol.textContent = "°C";
        temp_feels_like.textContent = "FEELS LIKE: " + current_day.feelsLike.celsius;
        temp_type_feels_like.textContent = "°C";
        humidity.textContent = "WIND: " + current_day.humidity + " kph";
        wind.textContent = "HUMIDITY: " + current_day.wind.kph + "%";

        error_message.style.display = "none";

    } catch(error) {
        error_message.style.display = "flex";
    }
    
    

}

const search = document.querySelector("#searchForm");

search.addEventListener("submit", function() {
    event.preventDefault();
    city = document.querySelector("#search").value;
    getWeatherData(city);
});

getWeatherData(city);