// document.addEventListener("DOMContentLoaded", () => {
//     getLocation()
// })


// function getLocation() {
//     fetch("http://localhost:3000/location", {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json",
//             "Accept": "application/json",
//         }
//     })
//     .then((response) => response.json())
//     .then((data) => console.log(data))
// }





function getWeather() {

    const apiKey = '7310bc6c2e475eb2dc95fd6b8fae69a6';
    const location = document.getElementById('location').value;

    if (!location) {
        alert('please enter a location');
        return;
    }

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}`;

    fetch (currentWeatherUrl)
            .then(response => response.json())
            .then(data => {
                displayWeather(data);
                getWeeklyForecast(data.coord.lat, data.coord.lon);
            })
            .catch(error => {
                console.error('Error fetching current weather data:', error)
                alert( 'Error fetching current weather data. Please try again')
            });
    fetch (forecastUrl)
            .then(response => response.json())
            .then(data => {
                displayHourlyForecast(data.list);
            })
            .catch(error => {
                console.error('Error fetching hourly forecast data:', error);
                alert( 'Error fetching hourly forecast data. Please try again');
            });


}

function displayWeather(data) {

    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon= document.getElementById('weather-icon');
    const hourlyForecast= document.getElementById('hourly-forecast');

    weatherInfoDiv.innerHTML = '';
    hourlyForecast.innerHTML = '';
    tempDivInfo.innerHTML = '';

    if (data.cod === '404') {
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
    } else {
        const location = data.name;
        const temp = Math.round(day.temp.day - 273.15);
        const description = data.weather[0].description;
        const iconCode = data.weather[0].Icon;
        const iconUrl = `https://api.openweathermap.org/img/wn/${iconCode}@4x.png`;


        const weatherHTML = `
    
        <p>${location}</p>
        <p>${description}</p>
    `

        weatherInfoDiv.innerHTML = temparatureHTML;
        hourlyForecast.innerHTML = weatherHTML;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;

    showImage();
    }

}

function displayHourlyForecast(hourlyData) {

    const hourlyfocustDiv = doccument.getElementById('hourly-forecast');
    const next24hours = hourlyData.slice(0,8);

    next24hours.forEach(item => {
        const dateTime =  new Date(item.dt * 1000);
        const hour = dateTime.getHours();
        const iconCode = data.weather[0].Icon;
        const iconUrl = `https://api.openweathermap.org/img/wn/${iconCode}@4x.png`;

        const hourlyItemHtml = `
            <div>
            <span>${hour}:00</span>
            <img> src ="${iconUrl}" alt="Hourly Weather Icon"
            <div/>
            
        `;
        hourlyfocustDiv.innerHTML += hourlyItemHtml;

    });
}

function displayWeeklyForecast(weeklyData) {
    const weeklyForecastDiv = document.getElementById('weekly-forecast');
    weeklyForecastDiv.innerHTML = ''; 

    weeklyData.forEach((day, index) => {
        const date = new Date(day.dt * 1000);
        const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
        const temp = Math.round(day.temp.day - 273.15);
        const description = day.weather[0].description;
        const iconCode = day.weather[0].icon;
        const iconUrl = `https://api.openweathermap.org/img/wn/${iconCode}@4x.png`;

        const weeklyItemHTML = `
            <tr>
                <td>${index + 1}</td>
                <td>${document.getElementById('location').value}</td>
                <td>
                    <img src="${iconUrl}" alt="${description}">
                    <br>${dayOfWeek}: ${temp}°C, ${description}
                </td>
                <td>${recommendation}</td> <!-- Here the recommendation is displayed -->
            </tr>
        `;

        weeklyForecastDiv.innerHTML += weeklyItemHtml;
    });
}

function getFarmingRecommendation(weather) {

    if (weather.includes("sunny")) {
        return "Toil land, don't plant";
    } else if (weather.includes("rain")) {
        return "Plant crops, weed control";
    } else if (weather.includes("cloud")) {
        return "Prepare land, minimal irrigation";
    } else if (weather.includes("storm") || weather.includes("thunderstorm")) {
        return "Avoid fieldwork, secure crops";
    } else if (weather.includes("fog") || weather.includes("mist")) {
        return "Monitor moisture, wait for clearance";
    } else {
        return "Monitor weather conditions closely";
    }
}

function showImage() {

    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display = 'block';
}