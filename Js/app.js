document.addEventListener("DOMContentLoaded", async () => {
    const items = await getItems();
    const cartItems = await getCartItems()
    renderItems(items);

})


function getTools() {
    fetch("http://localhost:3000"), {
        method: "GET"
        headers: {
            Accept: "application/json"
        }
    }.then((response) => response.json())
    .then((data) => data);
}

function renderTools(tools = []) {
    const toolsContainer = document.querySelector("#tools");
  
    tools.forEach((tool, index) => {
      itemsContainer.innerHTML += `
          <div class="card col-3 my-2 mx-auto" style="width: 18rem;">
                  <img src="https://placehold.co/400x200" class="card-img-top" alt="...">
                  <div class="card-body">
                    <h5 class="card-title">${tool.name}</h5>
                    <p class="card-text">${tool.price} Ksh</p>
                    <button id='${tool.id}' class="btn btn-primary btn-sm btn-add">Add To Cart</button>
                  </div>
                </div>
          `;
    });
  }