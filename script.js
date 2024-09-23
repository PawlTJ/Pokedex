function searchPokemon() {
  const inputElement = document.getElementById("pokemonInput");
  const pokemonName = inputElement.value.toLowerCase();

  // Clear previous results
  document.getElementById("resultContainer").innerHTML = "";

  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      // Display information about the Pokémon
      const resultContainer = document.getElementById("resultContainer");
      const pokemonData = `
        <p>Name: ${data.name}</p>
        <p>ID: ${data.id}</p>
        <img src="${data.sprites.front_default}" alt="${data.name}">
      `;
      resultContainer.innerHTML = pokemonData;
    })
    .catch(error => {
      console.error("Fetch error:", error);
      document.getElementById("resultContainer").innerHTML = "<p>Pokémon not found</p>";
    });
}


const pokemonNames = [
  "pikachu",
  "bulbasaur",
  "charmander",
  "squirtle",
  "jigglypuff",
  "snorlax",
  // Add more Pokémon names as needed
];

function autocompletePokemon(event) {
  const inputElement = event.target;
  const inputValue = inputElement.value.toLowerCase();
  const autocompleteContainer = document.getElementById("autocompleteContainer");

  // Clear previous suggestions
  autocompleteContainer.innerHTML = "";

  // Filter Pokémon names based on input value
  const filteredPokemon = pokemonNames.filter(name => name.includes(inputValue));

  // Display suggestions
  filteredPokemon.forEach(name => {
    const suggestionElement = document.createElement("div");
    suggestionElement.textContent = name;
    suggestionElement.addEventListener("click", () => {
      inputElement.value = name;
      autocompleteContainer.innerHTML = "";
    });
    autocompleteContainer.appendChild(suggestionElement);
  });
}

