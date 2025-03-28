const imageMap = {
    "Drip Irrigation System": "./images/Drip irrigation.png",
    "Mulching Sheets": "./images/Mulching.png",
    "Plow and Harrow": "./images/Plow and Hurrow.jpg",
    "Greenhouse": "./images/Greenhouse-jpg.webp",
    "Windbreak Fencing": "./images/wind breaker.jpg",
    "Water Pumps": "./images/Water Pump.jpg",
    "Pruning Shears": "./images/Pruning-sheers.webp",
    "Pest Traps and Sprayers": "./images/sprayer.jpg",
    "Compost Spreader": "./images/Spreader Compost.jpg",
    "Rice Paddies Drainage System": "./images/Paddy_field_and_Drainage.jpg",
    "Fodder Cutter and Storage": "./images/Chuff Cutter.png",
    "Borehole Drilling Equipment": "./images/Borehole Drilling.png"
};

function signIn() {
    const defaultCredentials = {
        username: "briankagia",
        password: "1234"
    };

    const inputUsername = prompt("Enter Username:");
    const inputPassword = prompt("Enter Password:");

    if (inputUsername === defaultCredentials.username && inputPassword === defaultCredentials.password) {
        alert("Login Successful! Welcome, " + defaultCredentials.username);
    } else {
        alert("Incorrect username or password. Please try again.");
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    document.getElementById("signInBtn").addEventListener("click", signIn);

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
        const imageUrl = imageMap[tool.tool_name] || "https://placehold.co/400x400";

        toolsContainer.innerHTML += `
            <div class="card col-4 my-2 mx-auto" style="width: 15rem;">
                <img src="${imageUrl}" class="card-img-top" alt="${tool.tool_name}">
                <div class="card-body">
                    <h5 class="card-title">${tool.tool_name}</h5>
                    <p class="card-text">${tool.price_kes} Ksh</p>
                    <button id='${tool.tool_id}' class="btn btn-primary btn-sm btn-add">Add To Cart</button>
                </div>
            </div>
        `;
    });

    // document.querySelectorAll(".btn-add").forEach((button) => {
    //     button.addEventListener("click", (event) => {
    //         const toolId = event.target.id;
    //         const tool = tools.find(t => t.tool_id == toolId);
    //         if (tool) displayItemToCart(tool);
    //     });
    // });
}

// function displayItemToCart(tool, quantity = 1) {
//     const cartContainer = document.querySelector("tbody#cart");

//     cartContainer.innerHTML += `
//         <tr>
//             <td>${tool.tool_id}</td>
//             <td>${tool.tool_name}</td>
//             <td>${tool.price_kes} Ksh</td>
//             <td>${quantity}</td>
//             <td>${tool.price_kes * quantity} Ksh</td>
//             <td>
//                 <button id='remove-${tool.tool_id}' class="btn btn-sm btn-danger btn-remove">x</button>
//             </td>
//         </tr>
//     `;
// }

function displayItemToCart(tool, quantity = 1) {
    const cartContainer = document.querySelector("tbody#cart");
    const existingRow = document.querySelector(`#cart tr[data-id='${tool.tool_id}']`);

    if (existingRow) {
        
        const quantityCell = existingRow.querySelector(".item-quantity");
        const totalCell = existingRow.querySelector(".item-total");

        let newQuantity = parseInt(quantityCell.textContent) + 1;
        quantityCell.textContent = newQuantity;
        totalCell.textContent = `${tool.price_kes * newQuantity} Ksh`;
    } else {
        
        cartContainer.innerHTML += `
            <tr data-id="${tool.tool_id}">
                <td>${tool.tool_id}</td>
                <td>${tool.tool_name}</td>
                <td>${tool.price_kes} Ksh</td>
                <td class="item-quantity">${quantity}</td>
                <td class="item-total">${tool.price_kes * quantity} Ksh</td>
                <td>
                    <button id='remove-${tool.tool_id}' class="btn btn-sm btn-danger btn-remove">x</button>
                </td>
            </tr>
        `;
    }
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

        console.log("Fetched Data:", data);

        console.log("Available Keys in Data:", Object.keys(data));

        const county = data.find(county => county.location.toLowerCase() === locationInput.toLowerCase());

        console.log("Matched County:", county);

        if (!county) {
            alert("Location not found. Please enter a valid county.");
            return;
        }

        const currentMonth = new Date().toLocaleString('en-US', { month: 'long' });

        console.log("Current Month:", currentMonth);

        const forecast = county.monthly_forecast[currentMonth];

        console.log("Forecast Data:", forecast);

        if (!forecast) {
            alert("Weather data not available for this location.");
            return;
        }

        displayWeatherTable(county.location, currentMonth, forecast.prediction, forecast.recommended_activity);

    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

function displayWeatherTable(location, month, prediction, activity) {
    const weatherReportDiv = document.querySelector("#weatherReport");


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



let iconCart = document.querySelector('.icon-cart');
let body = document.querySelector('body');
let closeCart = document.querySelector('.close');

iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})
