document.addEventListener("DOMContentLoaded", async () => {
    const tools = await getTools();
    console.log(tools);
    renderTools(tools);
});

async function getTools() {
    return fetch("http://localhost:3000/tools", {
        method: "GET",
        headers: {
            Accept: "application/json"
        }
    })
    .then((response) => response.json())
    .then((data) => data);
}

function renderTools(tools = []) {
    const toolsContainer = document.querySelector("#tools");
  
    toolsContainer.innerHTML = "";

    tools.forEach((tool) => {
      toolsContainer.innerHTML += `
          <div class="card col-3 my-2 mx-auto" style="width: 18rem;">
                  <img src="https://placehold.co/400x200" class="card-img-top" alt="Tool Image">
                  <div class="card-body">
                    <h5 class="card-title">${tool.tool_name}</h5>
                    <p class="card-text">${tool.price_kes} Ksh</p>
                    <button id='${tool.tool_id}' class="btn btn-primary btn-sm btn-add">Add To Cart</button>
                  </div>
          </div>
      `;
    });
}
