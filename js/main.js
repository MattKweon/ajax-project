var $searchDisplay = document.querySelector('.search-display');
var $searchBar = document.querySelector('#search-bar');
var $searchForm = document.querySelector('.search-form');
var searchInput = '';

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
  });
  xhr.send();
}

function getCocktailImg(name) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.pexels.com/v1/search?query=' + name + ' cocktail');
  xhr.setRequestHeader('Authorization', '563492ad6f917000010000013f401851feb74faca5ffe16effdf2403');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    // var imgUrl = xhr.response.photos[0].src.original;
  });
  xhr.send();
}

$searchBar.addEventListener('input', function (e) {
  searchInput = e.target.value;
});

$searchForm.addEventListener('submit', function (e) {
  e.preventDefault();
  getCocktailData(searchInput);
  getCocktailImg(searchInput);
});

// function createNewRecipe(entry) {

// }
