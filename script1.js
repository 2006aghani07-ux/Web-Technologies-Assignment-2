// -----------------------------
// Recipe Data (WORKING IMAGES)
// -----------------------------
const recipes = [
  {
    name: "Pancakes",
    category: "Breakfast",
    ingredients: ["flour", "milk", "egg", "sugar", "butter"],
    instructions: "Mix ingredients, cook on a skillet until golden brown.",
    images: [
      "https://t3.ftcdn.net/jpg/02/48/37/02/360_F_248370257_DLEhszjnQ8bBwrLJWC4KDA2ivgRVTp3W.jpg"
    ]
  },
  {
    name: "Caesar Salad",
    category: "Lunch",
    ingredients: ["lettuce", "croutons", "parmesan", "chicken", "dressing"],
    instructions: "Mix all ingredients in a bowl and serve chilled.",
    images: [
      "https://shwetainthekitchen.com/wp-content/uploads/2022/09/vegetarian-caesar-salad.jpg"
    ]
  },
  {
    name: "Chocolate Cake",
    category: "Dessert",
    ingredients: ["flour", "cocoa", "sugar", "eggs", "butter"],
    instructions: "Mix ingredients, bake at 180°C for 35 minutes.",
    images: [
      "https://sugarspunrun.com/wp-content/uploads/2024/01/Chocolate-cake-recipe-1-of-1-copy.jpg",
      
    ]
  },
  {
    name: "Avocado Toast",
    category: "Breakfast",
    ingredients: ["bread", "avocado", "olive oil", "salt", "pepper"],
    instructions: "Toast bread, spread avocado, drizzle oil, sprinkle salt & pepper.",
    images: [
      "https://images.stockcake.com/public/b/e/d/bed5f422-38ae-4f5b-bcd4-81391d0b7443_large/avocado-toast-breakfast-stockcake.jpg",
      
    ]
  },
  {
    name: "Spaghetti Bolognese",
    category: "Lunch",
    ingredients: ["spaghetti", "ground beef", "tomato sauce", "onion", "garlic"],
    instructions: "Cook spaghetti, prepare sauce with beef and tomato, combine and serve.",
    images: [
      "https://t4.ftcdn.net/jpg/02/40/99/19/360_F_240991913_c22j6WvLgpqiUvjaLiLc5rh14WO8jShB.jpg",
      
    ]
  },
  {
    name: "Grilled Salmon",
    category: "Dinner",
    ingredients: ["salmon", "lemon", "olive oil", "salt", "pepper"],
    instructions: "Season salmon, grill for 6-8 minutes per side, serve with lemon.",
    images: [
      "https://whatmollymade.com/wp-content/uploads/2025/06/grilled-salmon-4.jpg",
      
    ]
  },
  {
    name: "Chicken Stir Fry",
    category: "Dinner",
    ingredients: ["chicken", "bell peppers", "soy sauce", "garlic", "ginger"],
    instructions: "Cook chicken, add vegetables and sauce, stir fry for 5-7 minutes.",
    images: [
      "https://www.budgetbytes.com/wp-content/uploads/2024/01/8-finished.jpg",
      
    ]
  }
];

// -----------------------------
// DOM Elements
// -----------------------------
const ingredientInput = document.getElementById("ingredientInput");
const searchBtn = document.getElementById("searchBtn");
const recipesContainer = document.getElementById("recipesContainer");
const favoritesContainer = document.getElementById("favoritesContainer");
const darkModeToggle = document.getElementById("darkModeToggle");

let favorites = [];

// -----------------------------
// Load Favorites
// -----------------------------
if (localStorage.getItem("favorites")) {
  favorites = JSON.parse(localStorage.getItem("favorites"));
  renderFavorites();
}

// -----------------------------
// Search Function
// -----------------------------
searchBtn.addEventListener("click", () => {
  const query = ingredientInput.value.trim().toLowerCase();
  const filteredRecipes = recipes.filter(recipe =>
    recipe.ingredients.some(ing => ing.includes(query))
  );
  renderRecipes(filteredRecipes);
});

// -----------------------------
// Render Recipes
// -----------------------------
function renderRecipes(recipesArray) {
  recipesContainer.innerHTML = "";

  recipesArray.forEach(recipe => {
    const card = document.createElement("div");
    card.className = "recipe-card";

    const imagesHtml = `
      <div class="images-container">
        ${recipe.images.map(img => `
          <img src="${img}" alt="${recipe.name}" onerror="this.src='https://via.placeholder.com/150'">
        `).join("")}
      </div>
    `;

    card.innerHTML = `
      <h3>${recipe.name} (${recipe.category})</h3>
      ${imagesHtml}
      <p><strong>Ingredients:</strong> ${recipe.ingredients.join(", ")}</p>
      <button class="toggleInstructionsBtn">Show Instructions</button>
      <div class="instructions" style="display:none;">
        ${recipe.instructions}
      </div>
      <button class="addFavoriteBtn">Add to Favorites</button>
    `;

    card.querySelector(".toggleInstructionsBtn").addEventListener("click", function () {
      const inst = card.querySelector(".instructions");
      if (inst.style.display === "none") {
        inst.style.display = "block";
        this.textContent = "Hide Instructions";
      } else {
        inst.style.display = "none";
        this.textContent = "Show Instructions";
      }
    });

    card.querySelector(".addFavoriteBtn").addEventListener("click", () => {
      if (!favorites.some(f => f.name === recipe.name)) {
        favorites.push(recipe);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        renderFavorites();
      }
    });

    recipesContainer.appendChild(card);
  });
}

// -----------------------------
// Render Favorites
// -----------------------------
function renderFavorites() {
  favoritesContainer.innerHTML = "";

  favorites.forEach(recipe => {
    const card = document.createElement("div");
    card.className = "favorite-card";

    card.innerHTML = `
      <h3>${recipe.name}</h3>
      <div class="images-container">
        ${recipe.images.map(img => `<img src="${img}">`).join("")}
      </div>
      <button class="removeFavoriteBtn">Remove</button>
    `;

    card.querySelector(".removeFavoriteBtn").addEventListener("click", () => {
      favorites = favorites.filter(f => f.name !== recipe.name);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      renderFavorites();
    });

    favoritesContainer.appendChild(card);
  });
}

// -----------------------------
// Dark Mode
// -----------------------------
darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

