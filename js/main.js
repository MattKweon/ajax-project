var $searchDisplay = document.querySelector('.search-display');
var $searchBar = document.querySelector('#search-bar');
var $searchForm = document.querySelector('.search-form');
var searchInput = '';
var $recipeDisplay = document.querySelector('.recipe-display');
var ingredientList = data.recipe.ingredients;

function showDisplay(e) {
  if (e.target.matches('#search-btn')) {
    $searchDisplay.classList.remove('hidden');
  }
}

document.addEventListener('click', showDisplay);

function getCocktailData(name) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.api-ninjas.com/v1/cocktail?name=' + name);
  xhr.setRequestHeader('X-Api-Key', 'tsY43L3Lh5SZ/WR5FQznyA==QerTD0YdjkWIbYLP');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    data.recipe = xhr.response[0];
    $searchForm.reset();
    getCocktailImg(searchInput);
  });
  xhr.send();
}

function getCocktailImg(name) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.pexels.com/v1/search?query=' + name + ' cocktail');
  xhr.setRequestHeader('Authorization', '563492ad6f917000010000013f401851feb74faca5ffe16effdf2403');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    var imgUrl = xhr.response.photos[0].src.original;
    data.recipe.imgUrl = imgUrl;
    $recipeDisplay.append(createNewRecipe(data.recipe));
  });
  xhr.send();
}

$searchBar.addEventListener('input', function (e) {
  searchInput = e.target.value;
});

$searchForm.addEventListener('submit', function (e) {
  e.preventDefault();
  getCocktailData(searchInput);
});

function createNewRecipe(entry) {
  var cardContainer = document.createElement('div');
  cardContainer.setAttribute('class', 'container recipe-card');
  var rowEl = document.createElement('div');
  rowEl.setAttribute('class', 'row');
  cardContainer.appendChild(rowEl);
  var colHalf = document.createElement('div');
  colHalf.setAttribute('class', 'col-half');
  rowEl.appendChild(colHalf);
  var imgContainer = document.createElement('div');
  imgContainer.setAttribute('class', 'img-container');
  colHalf.appendChild(imgContainer);
  var cocktailImg = document.createElement('img');
  cocktailImg.setAttribute('class', 'cocktail-img');
  cocktailImg.setAttribute('src', data.recipe.imgUrl);
  cocktailImg.setAttribute('alt', data.recipe.name);
  imgContainer.appendChild(cocktailImg);
  var newColHalf = document.createElement('div');
  newColHalf.setAttribute('class', 'col-half recipe-content');
  rowEl.appendChild(newColHalf);
  var cocktailName = document.createElement('h1');
  cocktailName.textContent = data.recipe.name;
  newColHalf.appendChild(cocktailName);
  var ingredients = document.createElement('h3');
  ingredients.textContent = 'Ingredients';
  newColHalf.appendChild(ingredients);
  var ul = document.createElement('ul');
  newColHalf.appendChild(ul);
  for (var i = 0; i < ingredientList.length; i++) {
    var li = document.createElement('li');
    li.textContent = ingredientList[i];
    ul.appendChild(li);
  }
  var instructions = document.createElement('h3');
  instructions.textContent = 'Instructions';
  newColHalf.appendChild(instructions);
  var p = document.createElement('p');
  p.textContent = data.recipe.instructions;
  return cardContainer;
}
