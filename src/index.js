import './style.css';

let city = "Manila";

const weatherDataElement = document.querySelector('.weather-data');
const search = document.querySelector("#searchForm");
const see_forecast = document.querySelector("#forecast");

function getDayOfWeek(date) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
}

function generateWeatherDataDOM(current_day) {
    const error_message = document.querySelector(".error");

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
    weatherDataElement.classList.add('loaded');
}

function generateWeeklyForecast(weekly_forecast) {
    const forecast_data = document.querySelector(".forecast-data");
    forecast_data.innerHTML = "";

    for (let i = 0; i < 7; i++) 
    {
        const daily_forecast = weekly_forecast[i];
        const forecast_day = document.createElement("div");
        const day = document.createElement("div");
        const day_details = document.createElement("div");
        const weather_icon = document.createElement("img");
        const day_temp = document.createElement("div");
        
        forecast_day.classList.add("forecast-day");
        day.classList.add("day");
        day_details.classList.add("day-details");
        day_temp.classList.add("day-temp");

        day.textContent = getDayOfWeek(new Date(daily_forecast.date));
        weather_icon.src = daily_forecast.day.condition.icon;
        day_temp.textContent = daily_forecast.day.avgtemp_c + "°C";

        day_details.appendChild(weather_icon);
        day_details.appendChild(day_temp);

        forecast_day.appendChild(day);
        forecast_day.appendChild(day_details);

        forecast_data.appendChild(forecast_day);
    }
}

async function getWeatherData(city) {
    const apiKey = 'a21fddacf001434b931115221242502';
    const error_message = document.querySelector(".error");

    try {
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}/&days=7`, {mode: 'cors'});

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

        const weekly_forecast = weather_data.forecast.forecastday;
        generateWeeklyForecast(weekly_forecast);
        generateWeatherDataDOM(current_day);

    } catch(error) {
        error_message.style.display = "flex";
    }
    
}


search.addEventListener("submit", function() {
    event.preventDefault();
    city = document.querySelector("#search").value;
    weatherDataElement.classList.remove('loaded');
    getWeatherData(city);
});

see_forecast.addEventListener("click", function() {
    const forecast_details = document.querySelector(".forecast-details");

    if (forecast_details.style.display === "flex")
    {
        forecast_details.style.display = "none";
        see_forecast.textContent = "See Forecast";
    }
    else
    {
        forecast_details.style.display = "flex";
        see_forecast.textContent = "Hide Forecast";
    }
});

getWeatherData(city);
