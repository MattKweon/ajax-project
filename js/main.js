var $searchBar = document.querySelector('#search-bar');
var searchInput = '';

function getCocktailData(name) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.api-ninjas.com/v1/cocktail?name=' + name);
  xhr.setRequestHeader('X-Api-Key', 'tsY43L3Lh5SZ/WR5FQznyA==QerTD0YdjkWIbYLP');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    data.recipe = xhr.response[0];
    data.nextEntryId++;
    searchInput = '';
  });
  xhr.send();
}

$searchBar.addEventListener('input', function (e) {
  searchInput = e.target.value;
});

$searchBar.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    getCocktailData(searchInput);
  }
});
