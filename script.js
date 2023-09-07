const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");
const mealDetailPage = document.getElementById("mealDetailPage");
const mealDetailContainer = document.getElementById("mealDetailContainer");
const backButton = document.getElementById("backButton");

let meals = [];

const fetchMeals = async (query) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const data = await response.json();
    meals = data.meals || [];
    displaySearchResults(meals);
};

const displaySearchResults = meals => {
    searchResults.innerHTML = "";

    meals.forEach(meal => {
        const resultItem = document.createElement("li");
        resultItem.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <p>${meal.strMeal}</p>
            <button class="favorite-btn">Favorite</button>
        `;
        const favoriteBtn = resultItem.querySelector(".favorite-btn");
        favoriteBtn.addEventListener("click", () => addToFavorites(meal));
        searchResults.appendChild(resultItem);
    });
};

const openMealDetailPage = meal => {
    mealDetailPage.style.display = "block";
    displayMealDetail(meal);
};

const closeMealDetailPage = () => {
    mealDetailPage.style.display = "none";
};

const displayMealDetail = meal => {
    mealDetailContainer.innerHTML = `
        <h2>${meal.strMeal}</h2>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <h3>Instructions</h3>
        <p>${meal.strInstructions}</p>
        <button id="closeDetailButton">Close</button>
    `;
    const closeDetailButton = document.getElementById("closeDetailButton");
    closeDetailButton.addEventListener("click", closeMealDetailPage);
};

searchInput.addEventListener("input", () => {
    const query = searchInput.value;
    fetchMeals(query);
});

searchResults.addEventListener("click", event => {
    const mealItem = event.target.closest("li");
    if (mealItem) {
        const mealName = mealItem.querySelector("p").textContent;
        const selectedMeal = meals.find(meal => meal.strMeal === mealName);
        if (selectedMeal) {
            openMealDetailPage(selectedMeal);
        }
    }
});

backButton.addEventListener("click", closeMealDetailPage);

fetchMeals('a');
