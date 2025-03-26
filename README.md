# Kilimo-Digital
This is a Single Page Application (SPA) that provides real-time climate insights and smart crop recommendations to support farmers in making informed decisions.
# Features
Live Weather Updates – Get real-time climate data using a weather API (Meteosource).
Crop to plant Suggestions – Recommends best crops to plant based on location & weather.

# Technologies Used
HTML, CSS, JavaScript, OPen Weather App API



<header>
    <div class="logo-container">
        <img src="./images/Green and White Organic Agriculture Logo.png" alt="kilimo-hub logo" />
        <h4 class="logo">Kilimo Digital &#127805</h4>
    </div>
    <nav>
        <ul class="nav-links">
            <li><a class="nav-link" href="#">About Us</a></li>
            <li><a class="nav-link" href="#">Weather Reports</a></li>
            <li><a class="nav-link" href="#">Contact Us</a></li>
        </ul>
    </nav>
</header>
<body>
        <h2>Get Instant Climate Data</h2>
        <input type="text" id="location" placeholder="Enter Location">
        <button onclick="getWeather()" class="btn btn-success btn-sm">Get Weather Report</button>

        <img id="weather-icon" src = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.iconfinder.com%2Ficons%2F4102326%2Fcloud_sun_sunny_weather_icon&psig=AOvVaw1CsXNbFts7DyCelOlirZGr&ust=1743057147703000&source=images&cd=vfe&opi=89978449&ved=0CAMQjB1qFwoTCIiiuIKQp4wDFQAAAAAdAAAAABAE"alt="weather icon">
        <div id="temp-div"></div>
        <div id="weather-info"></div>
        <div id="hourly-forecast"></div>
        <div id="weekly-forecast"></div>
    </div>
    <div>
        <h2>Farm Activity Recommendations</h2>
        <table class ="table my-4">
            <thead>
                <tr>
                    <th>No.</th>
                    <th>Location</th>
                    <th>Weather Prediction</th>
                    <th>Recommended Activity</th>
                </tr>
            </thead>

        </table>


    </div>
    

    
</body>
</html>



