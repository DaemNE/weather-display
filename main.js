function displayF() {
    const cDiv = document.querySelector(".weather-info-units-c")
    const FDiv = document.querySelector(".weather-info-units-f")
    const tempDiv = document.getElementById("weather-info-temperature")
    const feelsLikeTempDiv = document.getElementById("weather-info-value-feels-like")

    feelsLikeTempInCelcius = feelsLikeTempDiv.textContent
    tempInCelcius = tempDiv.textContent


    tempInFahrenheit = Math.floor(((parseFloat(tempInCelcius) * 1.8) + 32) * 10) / 10
    feelsLikeTempInFahrenheit = Math.floor(((parseFloat(feelsLikeTempInCelcius) * 1.8) + 32) * 10) / 10

    tempDiv.textContent = tempInFahrenheit + "°F"
    feelsLikeTempDiv.textContent = feelsLikeTempInFahrenheit + "°F"

    cDiv.classList = "weather-info-units-c hidden"
    FDiv.classList = "weather-info-units-f"
}

function displayC() {
    const cDiv = document.querySelector(".weather-info-units-c")
    const FDiv = document.querySelector(".weather-info-units-f")
    const tempDiv = document.getElementById("weather-info-temperature")
    const feelsLikeTempDiv = document.getElementById("weather-info-value-feels-like")

    feelsLikeTempInCelcius = feelsLikeTempDiv.textContent
    tempInCelcius = tempDiv.textContent

    tempInFahrenheit = Math.floor((parseFloat(tempInCelcius) - 32) * (5 / 9) * 10) / 10
    feelsLikeTempInFahrenheit = Math.floor((parseFloat(feelsLikeTempInCelcius) - 32) * (5 / 9) * 10) / 10

    tempDiv.textContent = tempInFahrenheit + "°F"
    feelsLikeTempDiv.textContent = feelsLikeTempInFahrenheit + "°F"

    cDiv.classList = "weather-info-units-c"
    FDiv.classList = "weather-info-units-f hidden"
}

function search() {
    const input = document.getElementById("search-city")
    const searchCity = input.value
    input.value = ""
}

function toggleHourly() {

    const hourly = document.getElementById("hourly-display")
    const daily = document.getElementById("daily-display")
    const buttonHourly = document.getElementById("hourly")
    const buttonDaily = document.getElementById("daily")

    hourly.classList = "block"
    daily.classList = "hidden"
    buttonHourly.classList = "selected"
    buttonDaily.classList = ""
}

function toggleDaily() {

    const hourly = document.getElementById("hourly-display")
    const daily = document.getElementById("daily-display")
    const buttonHourly = document.getElementById("hourly")
    const buttonDaily = document.getElementById("daily")

    hourly.classList = "hidden"
    daily.classList = "block"
    buttonHourly.classList = ""
    buttonDaily.classList = "selected"

}

const search_city = document.getElementById("search-city");
search_city.addEventListener("keydown", function(e) {
    if (e.code === "Enter") {
        getData(e.target.value);
    }
});

function getData(location) {
    const apiKey = "f2bad8cb8def9c43413393e07fabedc4" //fake APIKEY
    const input = document.getElementById("search-city")
    let inputLocation = input.value

    if (location) {
        inputLocation = location
    }
    input.value = ""
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputLocation}&APPID=${apiKey}`
    fetch(apiUrl, {
        mode: 'cors'
    }).then(function(response) {
        return response.json()
    }).then(function(response) {
        // function calls to update all aspects of the browser
        updateLocationInfo(response)
        updateDetailedWeatherInfo(response)
        const errorMessage = document.getElementById("weather-info-error-msg")
        errorMessage.classList = "hidden"

    }).catch(() => {
        const errorMessage = document.getElementById("weather-info-error-msg")
        errorMessage.classList = ""
    });

}

function updateLocationInfo(response) {

    const weatherInfoDescription = document.getElementById("weather-info-description")
    const weatherInfoCity = document.getElementById("weather-info-city")
    const weatherInfoDate = document.getElementById("weather-info-date")

    const date = new Date(parseInt(response.dt * 1000 + (response.timezone - 3600) * 1000))
    let day = date.getDay()
    let dayOfMonth = date.getDate()
    let month = date.getMonth()
    let year = date.getFullYear()
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let seconds = date.getSeconds()

    hours = hours > 9 ? hours : "0" + hours
    minutes = minutes > 9 ? minutes : "0" + minutes
    seconds = seconds > 9 ? seconds : "0" + seconds


    const weatherInfoTemperature = document.getElementById("weather-info-temperature")
    const weatherInfoIcon = document.getElementById("weather-info-icon")

    switch (day) {
        case 0:
            day = "Monday";
            break;
        case 1:
            day = "Tuesday"
            break;
        case 2:
            day = "Wednesday";
            break;
        case 3:
            day = "Thursday"
            break;
        case 4:
            day = "Friday";
            break;
        case 5:
            day = "Saturday"
            break;
        case 6:
            day = "Sunday"
            break;
    }

    weatherInfoDescription.textContent = response.weather[0].main
    weatherInfoCity.textContent = `${response.name}, ${response.sys.country}`
    weatherInfoDate.textContent = `${day} ${dayOfMonth}/${month}/${year} ${hours}:${minutes}:${seconds}`
    weatherInfoTemperature.textContent = Math.floor((response.main.temp - 273.15) * 10) / 10 + "°C"
    switch (response.weather[0].main) {
        case "Clouds":
            weatherInfoIcon.data = "./images/clouds.svg"
            break;
        case "Rain":
            weatherInfoIcon.data = "./images/rain.svg"
            break;
        case "Clear":
            weatherInfoIcon.data = "./images/clear.svg"
            break;
        case "Mist":
            weatherInfoIcon.data = "./images/mist.svg"
            break;
        case "Thunderstorm":
            weatherInfoIcon.data = "./images/thunderstorm.svg"
            break;
        case "Snow":
            weatherInfoIcon.data = "./images/snow.svg"
            break;
        default:
            weatherInfoIcon.textContent = "unforseen weathercondition"
    }
}

function updateDetailedWeatherInfo(response) {

    const weatherInfoValueFeelsLike = document.getElementById("weather-info-value-feels-like")
    const weatherInfoValueHumidity = document.getElementById("weather-info-value-humidity")
    const weatherInfoValueWindspeed = document.getElementById("weather-info-value-windspeed")
    const weatherInfoValueSunrise = document.getElementById("weather-info-value-sunrise")
    const weatherInfoValueSunset = document.getElementById("weather-info-value-sunset")

    const sunriseDate = new Date(response.sys.sunrise * 1000 + (response.timezone - 3600) * 1000)
    let sunriseHours = sunriseDate.getHours()
    let sunriseMinutes = sunriseDate.getMinutes()
    let sunriseSeconds = sunriseDate.getSeconds()


    parseInt(response.dt * 1000 + (response.timezone - 3600) * 1000)

    const sunsetDate = new Date(response.sys.sunset * 1000 + (response.timezone - 3600) * 1000)
    let sunsetHours = sunsetDate.getHours()
    let sunsetMinutes = sunsetDate.getMinutes()
    let sunsetSeconds = sunsetDate.getSeconds()

    sunsetHours = sunsetHours > 9 ? sunsetHours : "0" + sunsetHours
    sunsetMinutes = sunsetMinutes > 9 ? sunsetMinutes : "0" + sunsetMinutes
    sunsetSeconds = sunsetSeconds > 9 ? sunsetSeconds : "0" + sunsetSeconds

    sunriseHours = sunriseHours > 9 ? sunriseHours : "0" + sunriseHours
    sunriseMinutes = sunriseMinutes > 9 ? sunriseMinutes : "0" + sunriseMinutes
    sunriseSeconds = sunriseSeconds > 9 ? sunriseSeconds : "0" + sunriseSeconds




    weatherInfoValueFeelsLike.textContent = Math.floor(response.main.feels_like - 273) + "°C"
    weatherInfoValueHumidity.textContent = response.main.humidity + "%"
    weatherInfoValueWindspeed.textContent = Math.floor(response.wind.speed * 3.6 * 10) / 10 + "km/h"
    weatherInfoValueSunrise.textContent = `${sunriseHours}:${sunriseMinutes}:${sunriseSeconds}`
    weatherInfoValueSunset.textContent = `${sunsetHours}:${sunsetMinutes}:${sunsetSeconds}`


}

getData("ternat")