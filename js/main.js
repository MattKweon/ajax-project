var $searchDisplay = document.querySelector('.search-display');
var $recipeDisplay = document.querySelector('.recipe-display');
var $searchBar = document.querySelector('#search-bar');
var $searchForm = document.querySelector('.search-form');
var searchInput = '';
var $likeBtn = document.querySelector('.like-btn');
var $unlikeBtn = document.querySelector('.unlike-btn');

function showDisplay(e) {
  if (e.target.matches('#search-btn')) {
    $searchDisplay.classList.remove('hidden');
    $recipeDisplay.classList.add('hidden');
    data.view = 'search-display';
  }
  if (e.target.matches('.like-btn')) {
    $likeBtn.classList.add('hidden');
    $unlikeBtn.classList.remove('hidden');
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
    var $recipeCard = document.querySelector('.recipe-card');
    var imgUrl = xhr.response.photos[0].src.original;
    data.recipe.imgUrl = imgUrl;
    $recipeCard.remove();
    $recipeDisplay.append(createNewRecipe(data.recipe));
  });
  xhr.send();
}

$searchBar.addEventListener('input', function (e) {
  searchInput = e.target.value;
});

$searchForm.addEventListener('submit', function (e) {
  e.preventDefault();
  $searchDisplay.classList.add('hidden');
  $recipeDisplay.classList.remove('hidden');
  data.view = 'recipe-display';
  getCocktailData(searchInput);
});

function titleCase(string) {
  var output = '';
  string = string.toLowerCase().split(' ');

  output = string[0][0].toUpperCase() + string[0].slice(1).toLowerCase();
  if (string.length === 1) {
    return output;
  }
  output += ' ';
  if (string.length > 1 && string.length !== 2) {
    for (var i = 1; i < string.length - 1; i++) {
      if (string[i] === 'and' || string[i] === 'or' || string[i] === 'nor' || string[i] === 'but' ||
        string[i] === 'a' || string[i] === 'an' || string[i] === 'the' || string[i] === 'as' || string[i] === 'at' ||
        string[i] === 'by' || string[i] === 'for' || string[i] === 'in' || string[i] === 'of' || string[i] === 'on' ||
        string[i] === 'per' || string[i] === 'to') {
        output += string[i].toLowerCase() + ' ';
      } else {
        output += string[i][0].toUpperCase() + string[i].slice(1).toLowerCase() + ' ';
      }
    }
  }
  output += string[string.length - 1][0].toUpperCase() + string[string.length - 1].slice(1).toLowerCase();
  return output;
}

function createNewRecipe(searchEntry) {
  var ingredientList = data.recipe.ingredients;
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
  cocktailName.textContent = titleCase(data.recipe.name);
  newColHalf.appendChild(cocktailName);
  var likeBtn = document.createElement('input');
  likeBtn.setAttribute('type', 'image');
  likeBtn.setAttribute('class', 'like-btn');
  likeBtn.setAttribute('src', 'images/heart-outline.png');
  likeBtn.setAttribute('alt', 'Like Button');
  newColHalf.appendChild(likeBtn);
  var unlikeBtn = document.createElement('input');
  unlikeBtn.setAttribute('type', 'image');
  unlikeBtn.setAttribute('class', 'unlike-btn hidden');
  unlikeBtn.setAttribute('src', 'images/heart-fill.png');
  unlikeBtn.setAttribute('alt', 'Unlike Button');
  newColHalf.appendChild(unlikeBtn);
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
  newColHalf.appendChild(p);
  return cardContainer;
}

document.addEventListener('DOMContentLoaded', function (e) {
  $recipeDisplay.append(createNewRecipe(data.recipe));
  if (data.view === 'recipe-display') {
    $searchDisplay.classList.add('hidden');
    $recipeDisplay.classList.remove('hidden');
  }
});
