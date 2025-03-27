document.addEventListener("DOMContentLoaded", async () => {
    const tools = await getTools();
    console.log(tools);
    renderTools(tools);

    document.querySelector("#tools").addEventListener("click", (event) => {
        if (event.target.classList.contains("btn-add")) {
            const toolId = event.target.id;
            const tool = tools.find(t => t.tool_id == toolId);
            if (tool) displayItemToCart(tool);
        }
    });
});

async function getTools() {
    const response = await fetch("http://localhost:3000/tools");
    return response.json();
}

function renderTools(tools = []) {
    const toolsContainer = document.querySelector("#tools");

    tools.forEach((tool) => {
        toolsContainer.innerHTML += `
            <div class="card col-4 my-2 mx-auto" style="width: 15rem;">
                <img src="https://placehold.co/400x400" class="card-img-top" alt="Tool Image">
                <div class="card-body">
                    <h5 class="card-title">${tool.tool_name}</h5>
                    <p class="card-text">${tool.price_kes} Ksh</p>
                    <button id='${tool.tool_id}' class="btn btn-primary btn-sm btn-add">Add To Cart</button>
                </div>
            </div>
        `;
    });

    document.querySelectorAll(".btn-add").forEach((button) => {
        button.addEventListener("click", (event) => {
            const toolId = event.target.id;
            const tool = tools.find(t => t.tool_id == toolId);
            if (tool) displayItemToCart(tool);
        });
    });
}

function displayItemToCart(tool, quantity = 1) {
    const cartContainer = document.querySelector("tbody#cart");

    cartContainer.innerHTML += `
        <tr>
            <td>${tool.tool_id}</td>
            <td>${tool.tool_name}</td>
            <td>${tool.price_kes} Ksh</td>
            <td>${quantity}</td>
            <td>${tool.price_kes * quantity} Ksh</td>
            <td>
                <button id='remove-${tool.tool_id}' class="btn btn-sm btn-danger btn-remove">x</button>
            </td>
        </tr>
    `;
}


document.querySelector("#getWeatherbtn").addEventListener("click", getLocationWeather);

async function getLocationWeather() {
    const locationInput = document.querySelector("#location").value.trim();
    if (!locationInput) {
        alert("Please enter a location.");
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/Counties");
        const data = await response.json();

        console.log("Fetched Data:", data); // Debugging - Log fetched JSON

        // Find the county by location name
        const county = data.location.find(county => county.location.toLowerCase() === locationInput.toLowerCase());

        console.log("Matched County:", county); // Debugging - Log found county

        if (!county) {
            alert("Location not found. Please enter a valid county.");
            return;
        }

        // Get the current month
        const currentMonth = new Date().toLocaleString('en-US', { month: 'long' });

        console.log("Current Month:", currentMonth); // Debugging - Log current month

        // Get weather and activity recommendation for the current month
        const forecast = county.monthly_forecast[currentMonth];

        console.log("Forecast Data:", forecast); // Debugging - Log forecast data

        if (!forecast) {
            alert("Weather data not available for this location.");
            return;
        }

        // Display the data in a table
        displayWeatherTable(county.location, currentMonth, forecast.prediction, forecast.recommended_activity);

    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

function displayWeatherTable(location, month, prediction, activity) {
    const weatherReportDiv = document.querySelector("#weatherReport");

    // Create the table if it doesn't exist
    if (!document.querySelector("#weatherTable")) {
        weatherReportDiv.innerHTML = `
            <table id="weatherTable" class="table">
                <thead>
                    <tr>
                        <th>Location</th>
                        <th>Month</th>
                        <th>Weather Prediction</th>
                        <th>Recommended Activity</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        `;
    }

    const tableBody = document.querySelector("#weatherTable tbody");

    // Add the new row
    tableBody.innerHTML = `
        <tr>
            <td>${location}</td>
            <td>${month}</td>
            <td>${prediction}</td>
            <td>${activity}</td>
        </tr>
    `;

    console.log("Table Updated Successfully!");
}
